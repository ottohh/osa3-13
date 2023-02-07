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
    const user = await User.findById(decodedToken.id)
    
   
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user:user._id

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
    console.log(blogToDelete)
    if(blogToDelete.user!==decodedToken.id.toString()){

      return response.status(401).json({ error: 'You dont have rights' })

    }
    blogToDelete.delete()

    response.status(204).end()  
})

blogsRouter.put("/:id", async(request, response,next) => {
  const id = request.params.id
  const blog = request.body
  let res =await Blog.findByIdAndUpdate(id,blog,{new:true})
  response.json(res).end()
})


module.exports = blogsRouter