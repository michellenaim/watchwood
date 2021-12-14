import React, { Component } from "react";
import AppNavbar from "./Navbar";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data, isLoading: false }));
  }
  render() {
    return (
      <div>
        <AppNavbar />
        {localStorage.getItem("currentUser") !== null && (
          <Container fluid>
            <Button className="m-5 nav bg-light">
              <Link to="/posts" className="nav-link">
                Manage Post List
              </Link>
            </Button>
          </Container>
        )}
        {localStorage.getItem("currentUser") === null && <h1>Hello!</h1>}
      </div>
    );
  }
}

export default Home;
