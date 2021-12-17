import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import AppNavbar from "./Navbar";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filterOn: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
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

  sortByDate = (e) => {
    if (e.target.value === "Ascending") {
      fetch("http://localhost:8080/api/posts")
        .then((response) => response.json())
        .then(() =>
          this.setState({
            posts: this.state.posts.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            ),
          })
        );
    } else {
      fetch("http://localhost:8080/api/posts")
        .then((response) => response.json())
        .then(() =>
          this.setState({
            posts: this.state.posts.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            ),
          })
        );
    }
  };

  render() {
    const { posts } = this.state;

    const postList = posts.map((post) => {
      const formattedDate = moment(post.date).format("MMMM Do YYYY, h:mma");

      return (
        <div key={post._id} className="my-3 post">
          <div className="p-4">
            <div className="d-flex justify-content-between">
              <h4>{post.title}</h4>
              <h5 className="text-end">{formattedDate}</h5>
            </div>
            <div className="d-flex">
              <p style={{ marginRight: "5px" }}>{post.location}</p>
              <p> - {post.neighborhood}</p>
            </div>
            <p>{post.description}</p>
            <p className="d-flex justify-content-end">By {post.username}</p>
            {localStorage.getItem("currentUser") !== null &&
              JSON.parse(localStorage.getItem("currentUser")).username ===
                post.username && (
                <div className="d-flex justify-content-end">
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
        <AppNavbar />

        <>
          {localStorage.getItem("currentUser") !== null && (
            <div className="d-flex main-title">
              <h3 className="d-flex justify-content-center m-auto p-4">
                Welcome{" "}
                {JSON.parse(localStorage.getItem("currentUser")).firstName}!
                Always be on the lookout.
              </h3>
              <Button className="btn-normal add-post" tag={Link} to="/post/new">
                Add post
              </Button>
            </div>
          )}
          {localStorage.getItem("currentUser") === null && (
            <h3 className="d-flex justify-content-center m-auto p-4 sub-title">
              What's happening around you?
            </h3>
          )}
        </>
        {localStorage.getItem("currentUser") === null && (
          <p className="d-flex justify-content-center px-4 sub-title">
            Sign up or Login to report an incident
          </p>
        )}
        <p className="d-flex justify-content-center px-4 sub-title text-center">
          Stay up to date and help the community by reporting incidents that
          happen around you.
        </p>
        <div>
          <img
            className="post-image"
            src="./post-image.jpg"
            alt="san-francisco"
          />
        </div>
        <Container fluid className="mt-4">
          <div className="d-flex justify-content-between">
            <div className="mb-4 d-flex sorting-btn">
              <FloatingLabel
                controlId="floatingSelect"
                label="Filter Posts By Neighborhood"
                style={{
                  width: "15rem",
                  marginTop: "13px",
                  marginRight: "20px",
                }}
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
              <FloatingLabel
                controlId="floatingSelect"
                label="Sort By Date"
                style={{
                  width: "15rem",
                  marginTop: "13px",
                }}
              >
                <Form.Select
                  aria-label="Floating label select example"
                  onChange={(e) => this.sortByDate(e)}
                >
                  <option value="Ascending">Ascending</option>
                  <option value="Descending">Descending</option>
                </Form.Select>
              </FloatingLabel>
            </div>
            <p className="posts-number">
              Total number of posts: {posts.length}
            </p>
          </div>
          {posts.length > 0 ? (
            <p>{postList}</p>
          ) : (
            <div className="d-flex justify-content-center p-4 no-posts m-4">
              There are no posts yet
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default PostList;
