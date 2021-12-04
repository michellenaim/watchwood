import React, { Component } from "react";
import AppNavbar from "./Navbar";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";

class PostList extends Component {
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
  render() {
    const { posts, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const postList = posts.map((post) => {
      return (
        <tr key={post._id}>
          <td style={{ whiteSpace: "nowrap" }}>{post.title}</td>
          <td>{post.date}</td>
          <td>{post.location}</td>
          <td>{post.neighborhood}</td>
          <td>{post.description}</td>
          <ButtonGroup>
            <Button
              size="sm"
              color="primary"
              tag={Link}
              to={"/post/" + post._id}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              onClick={() => this.removeInv(post._id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </tr>
      );
    });
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" className="my-4" tag={Link} to="/post/new">
              Add post
            </Button>
          </div>
          <h3>Post List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Title</th>
                <th width="10%">Date</th>
                <th width="15%">Location</th>
                <th width="10%">Neighborhood</th>
                <th width="15%">Description</th>
                <th width="15%">Actions</th>
              </tr>
            </thead>
            <tbody>{postList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default PostList;
