import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AppNavbar from "./Navbar";

function Login() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [flag, setFlag] = useState(false);

  const [usernameLog, setUsernameLog] = useState(" ");
  const [passwordLog, setPasswordLog] = useState(" ");

  const [flagLogin, setFlagLogin] = useState(false);

  function handleFormSubmitRegister(e) {
    e.preventDefault();

    if (!firstName || !lastName || !username || !password) {
      setFlag(true);
    } else {
      setFlag(false);

      const currentUser = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      };

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      console.log("Saved in Local Storage");
      history.push("/");
    }
  }

  function handleFormSubmitLogin(e) {
    e.preventDefault();

    if (localStorage.getItem("currentUser")) {
      let pass = JSON.parse(localStorage.getItem("currentUser")).password;
      let username = JSON.parse(localStorage.getItem("currentUser")).username;

      if (!usernameLog || !passwordLog) {
        setFlagLogin(true);
      } else if (passwordLog !== pass || usernameLog !== username) {
        setFlagLogin(true);
      } else {
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
                onChange={(event) => setUsernameLog(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => setPasswordLog(event.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end m-4">
              <Button className="btn-normal" type="submit">
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
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(event) => setUsername(event.target.value)}
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
              <Button className="btn-normal" type="submit">
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
