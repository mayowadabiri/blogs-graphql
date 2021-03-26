// @ts-nocheck
const mongoose = require("mongoose");
const User = require("./user");
const { handleError } = require("../helpers/index");
const Blog = require("./blog");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

commentSchema.post("save", async (result) => {
  const commentId = result._id;
  const blog = await Blog.findById(result.blog);
  blog.comments.push(commentId);
  await blog.save();
  return blog;
});

commentSchema.post("save", async (result) => {
  const commentId = result._id;
  const user = await User.findById(result.user);
  user.comments.push(commentId);
  await user.save();
  return user;
});

const Comment = mongoose.model("Comment", commentSchema);

Comment.createComment = async ({ content, id }, { userId }) => {
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("No Blog Found");
    }
    const comment = new Comment({
      content: content,
      blog: id,
      user: userId,
    });
    await comment.save();
    return {
      message: "Created Successfully",
      code: 200,
      comment,
    };
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

Comment.getAllComments = async () => {
  try {
    const comments = await Comment.find().lean();
    return comments
  } catch (error) {
    
  }
}
Comment.getCommentByBlog = async (blogId) => {
  try {
    const comments = await Comment.find({ blog: blogId }).lean();
    console.log(comments)
    return comments;
  } catch (error) {}
};
module.exports = Comment;
