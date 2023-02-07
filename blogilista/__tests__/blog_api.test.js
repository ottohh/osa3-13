
/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')

const logger = require("../utils/logger")
jest.setTimeout(1000*10)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash("otto", 10)
 

let user = new User({
  username:"otto",
  name:"asds",
  passwordHash:passwordHash
})

await user.save()
 let res = await User.find({})
 logger.info("alll")
 logger.info(res)

})


test('a valid blog can be added ', async () => {
  
  let user = {
    username:"otto",
    password:"otto"
  }


  let login = await api
  .post('/api/login')
  .send(user)
  
  const newblog = {
    title: "String",
    author: "String",
    url: "String",
    likes:123

}
  
  let token = login._body.token
  console.log(token)
  let res = await api
  .post('/api/blogs')
  .send(newblog)
  .set('Authorization', `Bearer ${token}`)
  

  
  expect(res.body.title).toEqual(newblog.title)

})


test('blog cant be added without valid token', async () => {
  
  let user = {
    username:"otto",
    password:"otto"
  }


  let login = await api
  .post('/api/login')
  .send(user)
  
  const newblog = {
    title: "String",
    author: "String",
    url: "String",
    likes:123

}
  
  
  let res = await api
  .post('/api/blogs')
  .send(newblog)
  .set('Authorization', `Bearer 423`)
  .expect(401)
  
  
  

  
  

})




test('correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

  
    expect(response.body).toHaveLength(1)
  
})


test('identifying field is id', async () => {
    const response = await api.get('/api/blogs')

    console.log(response.body)
   
    expect(response.body[0].id).toBeDefined()
  
})





  test('Likes not set', async () => {
    const newblog = {
        title: "String",
        author: "String",
        url: "String"
    }
  
    let user = {
      username:"otto",
      password:"otto"
    }
  
  
    let login = await api
    .post('/api/login')
    .send(user)
    
   
    
    let token = login._body.token
    console.log(token)
    let res = await api
    .post('/api/blogs')
    .send(newblog)
    .set('Authorization', `Bearer ${token}`)
    
  
    
    expect(res.body.likes).toEqual(0)
   
  })



  test('No url or title', async () => {
    const newBlog = {
        
        author: "String"
        
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      
  
  
   
  })



afterAll(async () => {
    await mongoose.connection.close()
  })




