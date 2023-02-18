import { useState, useEffect } from 'react'
import blogService from './services/blogs.js'
import BlogPage from './components/blogpage.js'

const Message = (props) => {
  if(!props.message)return
  console.log(props)
  const footerStyleSuccess = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  const footerStyleError = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 16
  }
  return(

    <div style={props.message.type==='error'?footerStyleError:footerStyleSuccess} >{props.message.message}</div>
  )



}





const App = () => {

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
          />

        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )



  const [user,setUser]=useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message,setMessage]=useState(null)

  const handleLogin = async(event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    blogService.login({ username,password })
      .then(res => {
        console.log('sad')

        setUser(res.data)
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(res.data)
        )
        setMessage({ type:'success','message':'Login successfull' })
        setTimeout(() => setMessage(null),5000)


      })
      .catch(() => {
        console.log('sad')
        setMessage({ type:'error','message':'wrong username or password' })
        setTimeout(() => setMessage(null),5000)

      })


  }











  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      let token =JSON.parse(loggedUserJSON).token
      setUser(JSON.parse(loggedUserJSON))
      blogService.setToken(token)

    }

  },[])




  return (<div>
    <h1>Blogs</h1>
    <Message message={message}/>

    {!user && loginForm()}
    {user && <BlogPage setUser={setUser} user={user} setMessage={setMessage}/>}

  </div>

  )
}

export default App