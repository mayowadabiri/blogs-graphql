// @ts-nocheck
const mongoose = require("mongoose");
const User = require("./user");
const { handleError } = require("../helpers/index");
const { AuthenticationError, ForbiddenError } = require("apollo-server");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

Blog.getBlogs = async () => {
  try {
    const blogs = await Blog.find().populate("user", ["username", "fullName"]);
    return blogs;
  } catch (error) {
    handleError(error);
  }
};

Blog.getBlog = async (id) => {
  try {
    const blog = await Blog.findById(id).populate("user", ["username"]);
    if (!blog) {
      throw new Error("No Blog Found");
    }
    return blog;
  } catch (error) {
    handleError(error);
  }
};

Blog.createBlog = async ({ title, content }, { userId }) => {
  try {
    const blog = new Blog({
      title: title,
      content: content,
      user: userId,
    });
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("No user found")
    }
    user.blogs.push(blog._id);
    await user.save();
    await blog.save();
    return {
      message: "Created Successfully",
      code: 200,
      blog,
    };
  } catch (error) {
    throw new Error(error.message)
  }
};

Blog.updateBlog = async ({ title, content, id }, { userId }) => {
  try {
    let blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("No Blog Found");
    }
    if (blog.user._id.toString() !== userId) {
      throw new ForbiddenError("You're not allowed to update this Blog");
    }
    blog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title,
        content: content,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    return {
      message: "Updated Successfully",
      code: 200,
      blog,
    };
  } catch (error) {
    handleError(error);
  }
};

Blog.deleteBlog = async (id, { userId }) => {
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("No Blog Found");
    }
    if (blog.user._id.toString() !== userId) {
      throw new Error("You're not allowed to delete this blog");
    }
    await Blog.findByIdAndDelete(id);
    const user = await User.findById(userId);
    await user.blog.pull(id);
    await user.save();
    return {
      message: "Deleted Successfully",
      code: 200,
    };
  } catch (error) {
    handleError(error);
  }
};
module.exports = Blog;
