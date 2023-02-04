const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
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



test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "String",
        author: "String",
        url: "String",
        likes:123
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    
  
    expect(response.body).toHaveLength(2)
   
  })

  test('Likes not set', async () => {
    const newBlog = {
        title: "String",
        author: "String",
        url: "String"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    
  
    expect(response.body[0].likes).toEqual(0)
   
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




