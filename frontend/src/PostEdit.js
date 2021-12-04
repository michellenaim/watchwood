import React, { Component } from "react";
import AppNavbar from "./Navbar";
import { Button, Form, Container, FormGroup, Input, Label } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

class PostEdit extends Component {
  emptyPost = {
    title: "",
    date: "",
    location: "",
    neighborhood: "",
    description: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      post: this.emptyPost,
    };
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const post = await (
        await fetch(
          `http://localhost:8080/api/post/${this.props.match.params.id}`
        )
      ).json();
      this.setState({ post: post });
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    let post = { ...this.state.post };
    post[name] = value;
    this.setState({ post });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { post } = this.state;

    await fetch("http://localhost:8080/api/post", {
      method: post._id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    this.props.history.push("/posts");
  };

  render() {
    const { post } = this.state;
    const title = (
      <h2 className="mt-3">{post._id ? "Edit Post" : "Add Post"}</h2>
    );

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title" className="h5 mt-3">
                Title
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={post.title || ""}
                onChange={this.handleChange}
                autoComplete="title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="date" className="h5 mt-3">
                Date
              </Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={post.date || ""}
                onChange={this.handleChange}
                autoComplete="date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="location" className="h5 mt-3">
                Location
              </Label>
              <Input
                type="text"
                name="location"
                id="location"
                value={post.location || ""}
                onChange={this.handleChange}
                autoComplete="location"
              />
            </FormGroup>
            <FormGroup>
              <Label for="neighborhood" className="h5 mt-3">
                Neighborhood
              </Label>
              <Input
                type="text"
                name="neighborhood"
                id="neighborhood"
                value={post.neighborhood || ""}
                onChange={this.handleChange}
                autoComplete="neighborhood"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description" className="h5 mt-3">
                Description
              </Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={post.description || ""}
                onChange={this.handleChange}
                autoComplete="description"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" className="mt-3">
                Save
              </Button>
              <Button color="secondary" className="mt-3" tag={Link} to="/posts">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(PostEdit);
