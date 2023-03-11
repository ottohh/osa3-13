import { useState, useEffect, useContext } from 'react'
import blogService from './services/blogs.js'
import BlogPage from './components/blogpage.js'
import { useReducer } from 'react'
import NoticationContext from './components/notificationContext.js'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Blog from './components/Blog.js'
import Users from './components/users.js'
import Navigation from './components/navigation.js'
import User from './components/user.js'

const Message = () => {
  const [notication]=useContext(NoticationContext)

  console.log(notication,'asdadsad')
  if(!notication.message)return
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

    <div style={notication.message.type==='error'?footerStyleError:footerStyleSuccess} >{notication.message}</div>
  )



}


const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'set':
    return { type:action.payload.type, message:action.payload.message }
  case 'empty':
    return { type:'', message:'' }
  default:
    return { type:'', message:'' }
  }
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
  const [notication,notificationDispatch]=useReducer(notificationReducer,{ type:'', message:'' })

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
        notificationDispatch( { type:'set',payload:{ type:'success',message:'Login successfull' } } )
        setTimeout(() => notificationDispatch( { type:'empty' } ),5000)


      })
      .catch(() => {
        console.log('sad')
        notificationDispatch( { type:'set',payload:{ type:'succe',message:'Login failed' } } )
        setTimeout(() => notificationDispatch( { type:'empty' } ),5000)

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
    <Router>
      <NoticationContext.Provider value={[notication,notificationDispatch]}>
        <Message/>
        {!user && <><h1>Blogs app</h1> {loginForm()}</>}
        {user && <><Navigation setUser={setUser}/></>
        }

        <Routes>
          <Route path="/blog/:id" element={<Blog user={user}/>} />
          <Route path='/' element={<>{user && <BlogPage/>}</>} />
          <Route path='/users' element={<>{user && <Users/>}</>} />
          <Route path="/user/:id" element={<User user={user}/>} />
        </Routes>
      </NoticationContext.Provider>
    </Router>


  </div>

  )
}

export default App