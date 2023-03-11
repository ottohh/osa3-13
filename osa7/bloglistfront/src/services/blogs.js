import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

let token = null
const setToken = (newToken) => {
  token=`Bearer ${newToken}`
}

const createBlog=(blog) => {
  const config = {
    headers: { Authorization: token },
  }
  axios.post(baseUrl,blog,config).then(res => res.data)


}

const likeBlog=(blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const newBlog={ ...blog,likes:blog.likes+1 }
  console.log(newBlog)
  return axios.put(`${baseUrl}/${blog.id}`,null,config).then(res => res.data)


}


const deleteBlog=(id) => {
  const config = {
    headers: { Authorization: token },
  }

  return axios.delete(`${baseUrl}/${id}`,config).then(res => res.data)


}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const login = (credentials) => {
  const request = axios.post(loginUrl,credentials)
  return request

}

const getUsers=() => axios.get('/api/users')

export default { getAll,login,setToken ,createBlog,deleteBlog ,likeBlog ,getUsers }