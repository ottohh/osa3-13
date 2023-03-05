import { createSlice } from '@reduxjs/toolkit'
import services from '../services/anecdotes'

const initialState = []

const asObject = (anecdote,votes,id) => {
  return {
    content: anecdote,
    id:id,
    votes: votes
  }
}



const anecdoteSlice=createSlice({
name:'anecdotes',
initialState,
reducers:{

  modifyAnecdote(state,action){
    return state.map(anecdote=>anecdote.id===action.payload ? {...anecdote,votes:anecdote.votes+1}:anecdote).sort((a,b)=>b.votes-a.votes)

  }
  ,
  AppendAnecdote(state,action){
    return state.concat(asObject(action.payload.content,action.payload.votes,action.payload.id))
  }
  ,
  setAnecdotes(state,action){

    return action.payload.sort((a,b)=>b.votes-a.votes)
  }
  
}


})


export const voteAnecdote = (id,anecdote) => {
  return async dispatch => {
    const newNote = await services.vote(id,{...anecdote,votes:anecdote.votes+1})
    dispatch(modifyAnecdote(id))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await services.createNew(content,0)
    dispatch(AppendAnecdote(newNote))
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await services.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}


export const { AppendAnecdote, modifyAnecdote,setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer