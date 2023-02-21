import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteList = ()=>{
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
   
  
  
    const vote = (id) => {
      console.log('vote', id)
      dispatch(voteAnecdote(id))
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