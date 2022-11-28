import React, { useContext } from 'react'
import { useState } from "react";

import { Form, Button, Alert } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from "./style.module.css";
import { signIn } from "../../service/auth"
import Spinner from 'react-bootstrap/Spinner';
import jwt_decode from "jwt-decode";
import { UserContext } from '../../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../config/configFirebase';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
    // returnSecureToken: true
  });

  const [isError, setError] = useState(false);

  const { authenticatedUser, successLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const handleChnage = (e) => {
    setError(false);
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    // login
    setLoading(true)
    signIn(user)
      .then((res) => {
        // check if current User is Admin
      let decodeToken = jwt_decode(res.user.accessToken);
      let isAdmin = decodeToken?.roles?.admin;
       if (isAdmin) {
          successLogin(decodeToken.email);
          navigate('/home');
       }
       setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });

  }
  return (
    <>
      {authenticatedUser && authenticatedUser.isAuth ?
        <Navigate to="/home" replace /> :
        <Container className={style.container}>
          <Row>
            <Col>
              <div className={style.col1}>
                <h2>Gestionnaire de festival</h2>
              </div>
            </Col>
            <Col>
              <div className={style.loginForm}>
                <Form onSubmit={submitForm}>
                  <h3>Connexion</h3>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Adresse mail</Form.Label>
                    <Form.Control type="email"
                      placeholder="Entrer email"
                      name='email'
                      onChange={handleChnage}
                      required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password"
                      placeholder="Mot de passe"
                      name='password'
                      onChange={handleChnage}
                      required />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Connexion
                  </Button>
                </Form>
                {loading && <Spinner animation="border" />}
                {isError && 
                  <Alert className={style.alert} variant="danger">
                    Invalid email or password !
                  </Alert>
                }
              </div>
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}
