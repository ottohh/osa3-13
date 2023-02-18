import { useState } from 'react'
import blogService from '../services/blogs.js'

const Blog = ({ blog,setBlogs,blogs,user }) => {
  const [isBlogVisible,setVisibility] = useState(false)
  const BlogVisibility = { display: isBlogVisible ? '' : 'none' }
  const like = async() => {
    try{
      blogService.likeBlog(blog)
      blog.likes=blog.likes+1
      const newBlogs = Array.from(blogs)
      const updateIndex = newBlogs.findIndex((bl) => bl.title===blog.title)
      newBlogs[updateIndex]=blog
      console.log(newBlogs)
      setBlogs(newBlogs)
      console.log('after')
    }catch(e){console.log(e)}
  }

  const remove=() => {

    if(window.confirm('Do you want to remove blog',blog.title)){
      console.log(Array.from(blogs))
      console.log('-------------------------')
      console.log(blogs)
      console.log('-------------------------')
      console.log({ ...blogs })
      const newBlogs = Array.from(blogs)
      const index = blogs.findIndex(b => b.title===blog.title)
      newBlogs.splice(index,1)
      console.log(newBlogs)
      setBlogs(newBlogs)
      console.log(blogService.deleteBlog(blog.id))

    }

  }

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