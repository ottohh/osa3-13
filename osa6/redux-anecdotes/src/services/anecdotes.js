import axios from "axios"
const baseUrl = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content,votes) => {
  const object = { content, votes}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id,anecdote) => {
  const object = anecdote
  const response = await axios.put(baseUrl+id, object)
  return response.data
}

export default {
  getAll,
  createNew,
  vote
}