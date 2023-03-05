import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {createAnecdote,initializeAnecdotes} from '../reducers/anecdoteReducer'
import { notification} from '../reducers/notificationReducer'
import anecdotes from '../services/anecdotes'

const AnecdoteForm = () =>{
    const dispatch = useDispatch()
    const createNew = (event)=>{
        event.preventDefault()
        console.log(event.target.anecdote.value)
        
        dispatch(notification(`new anecdote'${event.target.anecdote.value}'`,1000))

        dispatch(createAnecdote(event.target.anecdote.value))




    
      }
    useEffect(()=>{
      dispatch(initializeAnecdotes())
    }
     
      ,[])
    
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