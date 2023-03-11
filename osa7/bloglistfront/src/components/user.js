import { useEffect,useState } from 'react'
import blogs from '../services/blogs.js'
import { useParams } from 'react-router-dom'
import { Badge, ListGroup } from 'react-bootstrap'

const User = () => {

  const [user,setUser] = useState({})
  const id = useParams().id
  useEffect(() =>
  {
    blogs.getUsers().then(res => setUser(res.data.find(user => user.username.toString()===id)))

  }
  ,
  [])
  console.log(user)

  return(
    <div>
      <h1><Badge bg="dark" >{user.name}</Badge></h1>
      {user.Blogs && <ListGroup>
        {user.Blogs.map(blog => <ListGroup.Item variant="dark" key={blog.id} >{blog.title}</ListGroup.Item> )}

      </ListGroup>}


    </div>
  )

}


export default User