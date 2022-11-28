import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Header() {
  const { authenticatedUser, successLogout } = useContext(UserContext);
  const navigate = useNavigate();
  const signOut = () => {
    successLogout();
    navigate('/login');
  }
  function returnToHome () {
    navigate('/home')
  }
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand style={{cursor: 'pointer'}} onClick={returnToHome}>Hackathon 2022</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {
          authenticatedUser && authenticatedUser.isAuth ?
            <Button onClick={signOut}>Déconnexion</Button> : ''
        }
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
