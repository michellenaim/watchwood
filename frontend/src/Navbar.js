import React, { Component } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class AppNavbar extends Component {
  render() {
    return (
      <Navbar expand="lg" className="navbar-header">
        <Navbar.Brand href="/" style={{ marginLeft: "15px" }}>
          <img
            src="/watchwood-logo.png"
            className="d-inline-block align-top"
            alt="watchwood-logo"
            height="90"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ marginRight: "30px" }}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end mr-4"
          style={{ marginRight: "30px" }}
        >
          <Nav>
            <Nav.Link
              href="/"
              style={{ marginLeft: "10px" }}
              className="nav-item"
            >
              Home
            </Nav.Link>

            {localStorage.getItem("currentUser") === null && (
              <>
                <Nav.Link
                  href="/login"
                  style={{ marginLeft: "10px" }}
                  className="nav-item"
                >
                  Login
                </Nav.Link>
                <Button
                  style={{ marginLeft: "10px" }}
                  className="signup-btn"
                  size="sm"
                  tag={Link}
                  href="/login"
                >
                  Sign Up
                </Button>
              </>
            )}
            {localStorage.getItem("currentUser") !== null && (
              <Button
                style={{ marginLeft: "10px" }}
                className="signup-btn"
                size="sm"
                tag={Link}
                href="/"
                onClick={() => localStorage.clear()}
              >
                Log out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
