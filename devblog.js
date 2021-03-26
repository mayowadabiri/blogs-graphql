const { RESTDataSource } = require("apollo-datasource-rest");

class DevBlogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.token);
  }

  async login(username, password) {
    return this.post("/user/signin", {
      username,
      password,
    });
  }
  async getUser(id) {
    return this.get(`/user/${id}`);
  }
  async getBlogs() {
    return this.get("/blogs");
  }
  async getBlog(id) {
    return this.get(`/blog/${id}`);
  }

  async createBlog(title, content) {
    return this.post("/postBlog", {
      title,
      content,
    });
  }

  async createComment(content, id) {
    return this.post(`/create/comment/${id}`, {
      content,
    });
  }

  async getComments(id) {
    return this.get(`/comment/blog/${id}`);
  }
}

module.exports = DevBlogsAPI;
