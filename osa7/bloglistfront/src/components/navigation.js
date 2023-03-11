import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
function Navigation({ setUser }) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <LinkContainer to="/" ><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/users" ><Nav.Link>Users</Nav.Link></LinkContainer>
            <Nav.Link>Pricing</Nav.Link>
          </Nav>
          <Button size="lg" variant="dark" style={{ marginRight: '0.8rem' }} onClick={() => { setUser(null); window.localStorage.clear() } }>Log out</Button>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation