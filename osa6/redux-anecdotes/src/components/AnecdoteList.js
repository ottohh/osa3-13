import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import { notification} from '../reducers/notificationReducer'
const AnecdoteList = ()=>{
    
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote=>anecdote.content.includes(state.filter)))
    const dispatch = useDispatch()
    
  
  
    const vote = (id) => {
      console.log('vote', id)
      dispatch(notification(`you voted ${anecdotes.find(anecdote=>anecdote.id===id).content}`,5000))
      dispatch(voteAnecdote(id,anecdotes.find(anecdote=>anecdote.id===id)))
      console.log(anecdotes)
    }

    return (<div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id} className="anecdote">
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}

    </div>)
}



export default AnecdoteList