import { useState, useEffect, useRef } from 'react'
import Blog from './Blog.js'
import Togglable from './togglable.js'
import blogService from '../services/blogs.js'

const BlogPage = ({ user,setUser,setMessage }) => {
  const [urle,setUrle]=useState('')
  const [author,setAuthor]=useState('')
  const [title,setTitle]=useState('')
  const [blogs, setBlogs] = useState([])



  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes-a.likes) )
    )
  },[])


  const createBlog = async(event) => {
    event.preventDefault()
    setTitle('')
    setAuthor('')
    setUrle('')
    try{
      blogService.createBlog({ title,author,url:urle })

      setMessage({ type:'suc','message':'Success' })

    }catch(e){
      setMessage({ type:'suc','message':'Success' })
    }

    setTimeout(() => setMessage(null),5000)
    blogFormRef.current.toggleVisibility()




  }


  return(

    <div>
      <h2>blogs</h2>
      <button onClick={() => {setUser(null);window.localStorage.clear()}}>Log out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} setBlogs={setBlogs} blogs={blogs}
        />
      )}
      <Togglable buttonLabel={'Create new'} ref={blogFormRef}>
        <h2>Create new</h2>
        <form onSubmit={createBlog}>
          <div>
      title:
            <input
              type="text"
              value={title}
              data-testid="title"
              name="title"
              onChange={(event) => setTitle(event.target.value)}
            />

          </div>
          <div>
      author:
            <input
              type="author"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
      url:
            <input
              type="urle"
              value={urle}
              name="urle"
              onChange={({ target }) => setUrle(target.value)}
            />
          </div>
          <button type="create" className='create'>Create</button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogPage