/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
require('express-async-errors')
const Blog =require("../models/blog")
const User =require("../models/user")

blogsRouter.get('/', (request, response) => {
    Blog
      .find({}).populate("user")
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post("/", async(request, response,next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    console.log(decodedToken)
    const user = await User.findById(decodedToken.id)
    
    console.log(user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user:user.id

      })
   
      const savedBlog = await blog.save()
      user.Blogs = user.Blogs.concat(savedBlog._id)
      await user.save()


      console.log(savedBlog)
      response.json(savedBlog)
})




blogsRouter.delete("/:id", async(request, response,next) => {
    const id = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    let blogToDelete = await Blog.findById(id)
    console.log(decodedToken.id)
    console.log(blogToDelete.user.toString())
    console.log('blogToDelete.user.toString()')
    if(blogToDelete.user.toString()!==decodedToken.id){

      return response.status(401).json({ error: 'You dont have rights' })

    }
    blogToDelete.delete()

    response.status(204).end()  
})



blogsRouter.put("/:id", async(request, response,next) => {
  const id = request.params.id
  
  console.log(request.body)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  let blogToLike = await Blog.findById(id)
  console.log(decodedToken.id)
 
  console.log(blogToLike)
  if(blogToLike.likes===undefined){blogToLike.likes=1}
  else{
    blogToLike.likes=blogToLike.likes+1
  }
  
  
  
  res=blogToLike.save()
  response.json(blogToLike).end()
})


module.exports = blogsRouter