import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog.js'
import userEvent from '@testing-library/user-event'
const blogService = require('../services/blogs.js')
import BlogPage from './blogform.js'







test('Render only title', () => {
  const blog = {
    author: 'Component testing is done with react-testing-library',
    url: 'true',
    title:'asd',
    likes:123,
    user: { username:'ew' }
  }
  const user={
    username:'otto'
  }

  render(<Blog blog={blog} user={user}/>)

  const element = screen.getByText('asd')
  expect(element).toBeDefined()
})


test('clicking view shows the blog information', async () => {
  const blog = {
    author: 'Component testing is done with react-testing-library',
    url: 'true',
    title:'asd',
    likes:123,
    user: { username:'ew' }
  }
  const user={
    username:'otto'
  }

  let { container } = render(<Blog blog={blog} user={user}/>)
  expect(container.querySelector('#blog')).toHaveStyle('display: none')
  const userE = userEvent.setup()
  screen.debug()
  const button = screen.getByText('view')
  await userE.click(button)
  expect(container.querySelector('#blog')).not.toHaveStyle('display:none')

})



test('Like 2 times', async () => {

  const like = jest.fn()

  const blog = {
    author: 'Component testing is done with react-testing-library',
    url: 'true',
    title:'asd',
    likes:123,
    user: { username:'ew' }
  }
  const user={
    username:'otto'
  }

  render(<Blog blog={blog} user={user} like={like}/>)

  const userE = userEvent.setup()




  let button = screen.getByText('Like')
  await userE.click(button)
  await userE.click(button)
  expect(like.mock.calls).toHaveLength(2)

})

test('create blog', async () => {

    
    const spy =jest.spyOn(blogService.default,"createBlog")
    const setMessage  = jest.fn()

  const blog = {
    author: 'Component testing is done with react-testing-library',
    url: 'true',
    title:'asd',
    likes:123,
    user: { username:'ew' }
  }
  const user={
    username:'otto'
  }

  let { container } = render(<BlogPage setMessage={setMessage}/>)

  const userE = userEvent.setup()

  

  
  let button = screen.getByText('Create')
  let title = screen.getByTestId("title")
  
  
  console.log(title)
  
  await userE.type(title,"haha")
  await userE.click(button)
  expect(spy).toHaveBeenCalled()
  console.log(spy.mock.calls[0][0])
  expect(spy.mock.calls[0][0]).toEqual({title:"haha",author:"",url:""})
  
  
  

})