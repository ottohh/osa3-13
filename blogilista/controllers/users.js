const usersRouter = require('express').Router()
const User = require("../models/user")
const Blog = require("../models/blog")
const bcrypt = require('bcrypt')
require('express-async-errors')

usersRouter.post("/", async(request, response,next) => {
   
    const {username, name,password} = request.body

    if(password.length<3){
        return response.status(400).json({ error: 'too short password' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash,
      })

    

    const savedUser=await user.save()
    
    response.status(201).json(savedUser)

})

usersRouter.get('/', (request, response,next) => {
    User
      .find({}).populate("Blogs")
      .then(Users => {
        response.json(Users)
      }).catch(error=>next(error))
  })



module.exports=usersRouter