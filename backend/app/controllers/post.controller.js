const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Post = mongoose.model("Post");

exports.createPost = (req, res) => {
  const post = new Post({
    title: String,
    date: Date,
    location: String,
    neighborhood: String,
    description: String,
  });
  post
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fail!",
        error: err.message,
      });
    });
};

exports.posts = (req, res) => {
  Post.find()
    .select("-__v")
    .then((postInfos) => {
      res.status(200).json(postInfos);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error!",
        error: error,
      });
    });
};

exports.deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .select("-__v-_id")
    .then((post) => {
      if (!post) {
        res.status(404).json({
          message: "No post found with id = " + res.params.id,
          error: "404",
        });
      }
      res.status(200).json({});
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error -> Can't delete post with id = " + req.params.id,
        error: err.message,
      });
    });
};
