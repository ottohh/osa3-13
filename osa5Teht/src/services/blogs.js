import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

let token = null
const setToken = (newToken) => {
  token=`Bearer ${newToken}`
}

const createBlog=async(blog) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(123123)
  return await axios.post(baseUrl,blog,config)


}

const likeBlog=async(blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const newBlog={ ...blog,likes:blog.likes+1 }
  console.log(newBlog)
  return await axios.put(`${baseUrl}/${blog.id}`,null,config)


}


const deleteBlog=async(id) => {
  const config = {
    headers: { Authorization: token },
  }

  return await axios.delete(`${baseUrl}/${id}`,config)


}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const login = (credentials) => {
  const request = axios.post(loginUrl,credentials)
  return request

}

export default { getAll,login,setToken ,createBlog,deleteBlog ,likeBlog }