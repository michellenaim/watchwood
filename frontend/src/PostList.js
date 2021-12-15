import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
      filterOn: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data, isLoading: false }));
  }

  removeInv = async (id) => {
    await fetch(`http://localhost:8080/api/post/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("Remove Done!");

    let updatedPosts = [...this.state.posts].filter((i) => i._id !== id);
    this.setState({ posts: updatedPosts });
  };

  sortByNeighborhood = (e) => {
    const sortingTitle = e.target.value;
    if (sortingTitle === "All") {
      return fetch("http://localhost:8080/api/posts")
        .then((response) => response.json())
        .then((data) => this.setState({ posts: data }));
    } else {
      fetch("http://localhost:8080/api/posts")
        .then((response) => response.json())
        .then((data) => this.setState({ posts: data }))
        .then(() =>
          this.setState({
            posts: this.state.posts.filter(
              (post) => post.neighborhood === sortingTitle
            ),
          })
        );
    }
  };

  render() {
    const { posts, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const postList = posts.map((post) => {
      const formattedDate = moment(post.date).format("MMMM Do YYYY, h:mma");

      return (
        <div key={post._id} className="my-4 post">
          <div className="p-4">
            <div className="d-flex justify-content-between">
              <h4>{post.title}</h4>
              <h5>{formattedDate}</h5>
            </div>
            <div className="d-flex">
              <p style={{ marginRight: "5px" }}>{post.location}</p>
              <p> - {post.neighborhood}</p>
            </div>
            <p>{post.description}</p>
            <p className="d-flex justify-content-end">By {post.username}</p>
            {JSON.parse(localStorage.getItem("currentUser")).username ===
              post.username && (
              <div className="d-flex justify-content-end">
                {/* <Button
                  size="sm"
                  color="primary"
                  tag={Link}
                  to={"/post/" + post._id}
                >
                  Edit
                </Button> */}
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => this.removeInv(post._id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      );
    });
    return (
      <div>
        <h3 className="mt-3 d-flex justify-content-center">
          Here's what's been going on around you...
        </h3>
        <Container fluid className="mt-4">
          {localStorage.getItem("currentUser") !== null && (
            <div
              className="d-flex justify-content-between"
              style={{ width: "23rem" }}
            >
              <FloatingLabel
                controlId="floatingSelect"
                label="Filter Posts By Neighborhood"
                style={{ minWidth: "15rem", marginTop: "13px" }}
              >
                <Form.Select
                  aria-label="Floating label select example"
                  onChange={(e) => this.sortByNeighborhood(e)}
                >
                  <option value="All">All</option>
                  <option value="Castro">Castro</option>
                  <option value="Chinatown">Chinatown</option>
                  <option value="Fillmore">Fillmore</option>
                  <option value="Financial District">Financial District</option>
                  <option value="SOMA">SOMA</option>
                  <option value="Haight-Ashbury">Haight-Ashbury</option>
                  <option value="Japantown">Japantown</option>
                  <option value="Hayes Valley">Hayes Valley</option>
                  <option value="Marina">Marina</option>
                  <option value="Mission">Mission</option>
                  <option value="Nob Hill">Nob Hill</option>
                  <option value="Noe Valley">Noe Valley</option>
                  <option value="North Beach">North Beach</option>
                  <option value="Richmond">Richmond</option>
                  <option value="Sunset">Sunset</option>
                  <option value="Union Square">Union Square</option>
                </Form.Select>
              </FloatingLabel>
              <Button className="my-4 btn-normal" tag={Link} to="/post/new">
                Add post
              </Button>
            </div>
          )}
          <p>{postList}</p>
        </Container>
      </div>
    );
  }
}

export default PostList;
