import React, { Component } from "react";
import {
  Image,
  Nav,
  Navbar,
  NavbarBrand,
  Container,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class AppNavbar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img
            src="/watchwood-logo.png"
            className="d-inline-block align-top"
            alt="watchwood-logo"
            height="120"
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
          <Nav activeKey="/">
            <Nav.Link href="/" style={{ marginLeft: "10px" }}>
              Home
            </Nav.Link>
            <Nav.Link href="/login" style={{ marginLeft: "10px" }}>
              Login
            </Nav.Link>
            <Button
              style={{ marginLeft: "10px" }}
              variant="outline-primary"
              size="sm"
              tag={Link}
              href="/login"
            >
              Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
