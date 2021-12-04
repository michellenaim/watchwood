import React from "react";
import Home from "./Home";
import PostList from "./PostList";
import PostEdit from "./PostEdit";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/posts" exact={true} component={PostList} />
        <Route path="/post/:id" component={PostEdit} />
      </Switch>
    </Router>
  );
}

export default App;
