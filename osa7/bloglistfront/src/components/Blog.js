
import { useState } from 'react'
import blogService from '../services/blogs.js'
import { useMutation, useQueryClient } from 'react-query'
import {
  useParams, useNavigate
} from 'react-router-dom'

const Blog = ({ user }) => {
  const [isBlogVisible,setVisibility] = useState(false)
  const queryClient = useQueryClient()
  const id = useParams().id
  const blog = queryClient.getQueryData('blogs').find(blog => blog.id.toString()===id)
  const BlogVisibility = { display: isBlogVisible ? '' : 'none' }
  const navigate = useNavigate()

  const like=() => {

    likeBlogMutation.mutate({ ...blog,likes:blog.likes+1 })

  }


  const remove=() => {

    if(window.confirm('Do you want to remove blog',blog.title)){
      removeBlogMutation.mutate(blog.id)
    }

  }




  const likeBlogMutation = useMutation(blogService.likeBlog,{ onSuccess:() => {

    queryClient.invalidateQueries('blogs')

  } , } )

  const removeBlogMutation = useMutation(blogService.deleteBlog,{ onSuccess:() => {

    console.log('updating')
    queryClient.invalidateQueries('blogs')
    navigate('/')

  } , })


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle={
    backgroundColor:'#008CBA',
    fontSize: 16,
    borderRadius: 8
  }

  return (
    <div style={blogStyle} className={'blog'} >
      {blog.title} <button onClick={() => {isBlogVisible===true?setVisibility(false):setVisibility(true)}}>{isBlogVisible===true?'hide':'view'}</button>
      <div style={BlogVisibility} id="blog">
        <p>{blog.url}</p>
        <p>Likes:{blog.likes} <button id="like"onClick={() => like()}>Like</button></p>
        <p>Author {blog.author} </p>
        {user.username===blog.user.username&&<div> <button style={removeButtonStyle} onClick={() => remove()}>remove</button></div>}

      </div>
    </div>
  )

}

export default Blog