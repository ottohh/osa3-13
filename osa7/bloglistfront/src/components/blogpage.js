/* eslint-disable no-undef */
import { useState, useRef, useContext } from 'react'
import Togglable from './togglable.js'
import blogService from '../services/blogs.js'
import { useQuery ,useMutation, useQueryClient } from 'react-query'
import NoticationContext from './notificationContext.js'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'


const BlogPage = () => {
  const [urle,setUrle]=useState('')
  const [author,setAuthor]=useState('')
  const [title,setTitle]=useState('')
  const [notication,notificationDispatch]=useContext(NoticationContext)
  console.log(notication)

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation(blogService.createBlog,{ onSuccess: () => {
    queryClient.invalidateQueries('blogs')
    notificationDispatch( { type:'set',payload:{ type:'success',message:'Blog created successfully' } } )
    setTimeout(() => notificationDispatch( { type:'empty' } ),5000)

  } , })

  const blogFormRef = useRef()

  const result = useQuery(
    'blogs',
    () => blogService.getAll().then(res => res)
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  const blogs = result.data.sort((a,b) => b.likes-a.likes)

  const createBlog = async(event) => {
    event.preventDefault()
    setTitle('')
    setAuthor('')
    setUrle('')
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate({ url:urle,title:title,author:author })




  }


  return(

    <div>
      <h2>blogs</h2>
      <ListGroup>
        {blogs.map(blog =>

          <ListGroup.Item variant="dark" key={blog.id}><Link to={`/blog/${blog.id}`}>{blog.title}</Link></ListGroup.Item>

        )}

      </ListGroup>
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