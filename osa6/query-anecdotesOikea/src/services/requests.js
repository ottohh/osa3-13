
import axios from 'axios'

export const getAnecdotes=() =>
{
    
    return axios.get('http://localhost:3001/anecdotes')
  
}
export const vote = anecdote =>
axios.put('http://localhost:3001/anecdotes/'+anecdote.id, {...anecdote , votes:anecdote.votes+1}).then(res => res.data)

export const Create = content => axios.post('http://localhost:3001/anecdotes/',{content,votes:0}).then(res => res.data)