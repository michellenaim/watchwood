module.exports = function (app) {
  var posts = require("../controllers/post.controller.js");
  // var user = require("../controllers/user.controller.js");

  app.post("/api/post", posts.createPost);
  app.get("/api/post/:id", posts.getPost);
  app.get("/api/posts", posts.posts);
  app.put("/api/post", posts.updatePost);
  app.delete("/api/post/:id", posts.deletePost);
};
