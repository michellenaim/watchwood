module.exports = function (app) {
  var posts = require("../controllers/post.controller.js");
  var user = require("../controllers/user.controller.js");

  app.post("/api/post", posts.createInventory);
  app.get("/api/posts", posts.posts);
  app.delete("/api/post/:id", posts.deleteInventory);
};
