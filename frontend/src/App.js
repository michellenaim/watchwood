import React from "react";
import PostList from "./PostList";
import PostEdit from "./PostEdit";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <div className="page-container">
        <div className="content-wrap">
          <Switch>
            <Route path="/login" exact={true} component={Login} />
            <Route path="/" exact={true} component={PostList} />
            <Route path="/post/:id" component={PostEdit} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
