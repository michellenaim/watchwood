import React, { Component } from "react";
import AppNavbar from "./Navbar";
import { Form, Button } from "react-bootstrap";

class Login extends Component {
  render() {
    return (
      <div>
        <AppNavbar />

        <div className="row pt-5 mx-5 justify-content-center">
          <div id="login-form" className="col-12 col-lg-5">
            <h3 align="center">Login</h3>
            <Form className="p-3">
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="d-flex justify-content-end m-4">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
          <div className="col-12 col-lg-5">
            <h3 align="center">Register</h3>
            <Form className="p-3">
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first last" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
              </Form.Group>
              <div className="d-flex justify-content-end m-4">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
