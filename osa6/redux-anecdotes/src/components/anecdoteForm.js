
import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
const AnecdoteForm = () =>{
    const dispatch = useDispatch()
    const createNew = (event)=>{
        event.preventDefault()
        console.log(event.target.anecdote.value)
        
        dispatch(createAnecdote(event.target.anecdote.value))
    
    
    
      }
    return(
        <div>
            <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
        </div>

    )



}



export default AnecdoteForm