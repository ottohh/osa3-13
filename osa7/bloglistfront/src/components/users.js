import { useEffect,useState } from 'react'
import blogs from '../services/blogs.js'
import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const Users = () => {

  const [users,setUsers] = useState([])
  useEffect(() =>
  {
    blogs.getUsers().then(res => setUsers(res.data))

  }
  ,
  [])
  console.log(users)
  return(
    <div>
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>

            <th>Name</th>

            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            console.log(user)
            return(
              <tr key={user.username}>
                <LinkContainer to={'/user/'+user.username} ><td>{user.name}</td></LinkContainer>
                <td>{user.Blogs.length}</td>

              </tr>
            )

          })}


        </tbody>
      </Table>


    </div>
  )

}


export default Users