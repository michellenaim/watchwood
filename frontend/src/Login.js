import React, { Component, useState } from "react";
import AppNavbar from "./Navbar";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(false);

  const [emaillog, setEmaillog] = useState(" ");
  const [passwordlog, setPasswordlog] = useState(" ");

  const [flagLogin, setFlagLogin] = useState(false);

  // const [home, setHome] = useState(true);

  function handleFormSubmitRegister(e) {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setFlag(true);
    } else {
      setFlag(false);

      const currentUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      // localStorage.setItem("registrationFirstName", JSON.stringify(firstName));
      // localStorage.setItem("registrationLastName", JSON.stringify(lastName));
      // localStorage.setItem("registrationEmail", JSON.stringify(email));
      // localStorage.setItem("registrationPassword", JSON.stringify(password));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      console.log("Saved in Local Storage");
      history.push("/");
    }
  }

  function handleFormSubmitLogin(e) {
    e.preventDefault();

    if (
      localStorage.getItem("registrationPassword") &&
      localStorage.getItem("registrationPassword")
    ) {
      let pass = localStorage.getItem("registrationPassword").replace(/"/g, "");
      let mail = localStorage.getItem("registrationEmail").replace(/"/g, "");

      if (!emaillog || !passwordlog) {
        setFlagLogin(true);
        console.log("EMPTY");
      } else if (passwordlog !== pass || emaillog !== mail) {
        setFlagLogin(true);
      } else {
        // setHome(!home);
        setFlagLogin(false);
        history.push("/posts");
      }
    } else {
      setFlagLogin(true);
    }
  }

  return (
    <div>
      <AppNavbar />

      <div className="row pt-5 mx-5 justify-content-center">
        <div id="login-form" className="col-12 col-lg-5">
          <h3 align="center">Login</h3>
          <Form className="p-3" onSubmit={handleFormSubmitLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(event) => setEmaillog(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => setPasswordlog(event.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end m-4">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
            {flagLogin && (
              <Alert color="primary" variant="danger">
                Incorrect credentials. Please try again.
              </Alert>
            )}
          </Form>
        </div>
        <div className="col-12 col-lg-5">
          <h3 align="center">Register</h3>
          <Form className="p-3" onSubmit={handleFormSubmitRegister}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first last"
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end m-4">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
            {flag && (
              <Alert color="primary" variant="danger">
                Please fill out all fields.
              </Alert>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
