import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes,vote } from './services/requests'
import { useQuery,useMutation ,useQueryClient} from 'react-query'
import { useReducer } from 'react'
import notificationContext from './components/notificationContext'





const notificationReducer = (state, action) => {
  
  switch (action.type) {
    
    case "setMessage":
        console.log("state",state)
        return action.payload
    case "clear":
      console.log("state",state)
      console.log("claered")
        return ""
   
    default:
        return state
  }
}



const App = () => {


  
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")

  const queryClient = useQueryClient()
  const voteMutation = useMutation(vote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  

  const handleVote = (anecdote) => {
    console.log('vote')
    voteMutation.mutate(anecdote)
    notificationDispatch({ type: "setMessage",payload:"voted:"+anecdote.content })
    setTimeout(()=>notificationDispatch({ type: "clear"}),5000)

  }

  let anecdotes = [
    
  ]



  const result = useQuery(
    'anecdotes',
    ()=>getAnecdotes().then(res => res.data)
  )
  
  
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  anecdotes=result.data
  console.log(anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>
    <notificationContext.Provider value={[notification, notificationDispatch]}>

    <Notification />
      <AnecdoteForm />

    </notificationContext.Provider>
     
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
