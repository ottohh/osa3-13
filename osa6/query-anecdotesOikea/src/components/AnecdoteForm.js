import { useQuery,useMutation ,useQueryClient} from 'react-query'
import { useContext } from 'react'
import { Create } from '../services/requests'
import notificationContext from './notificationContext'
const AnecdoteForm = () => {

  const [notification, notificationDispatch]  = useContext(notificationContext)
  const queryClient =  useQueryClient() 

  const newNoteMutation = useMutation(Create, {
    onSuccess: (newAnecdote) => {
      const notes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', notes.concat(newAnecdote))
      notificationDispatch({ type: "setMessage",payload:"Created new anecdote" })
      setTimeout(()=>notificationDispatch({ type: "clear"}),5000)


    },
    onError:(data)=>{
      notificationDispatch({ type: "setMessage",payload:data.response.data.error })
      setTimeout(()=>notificationDispatch({ type: "clear"}),5000)
    } 
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newNoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new </h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
