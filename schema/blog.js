const { gql } = require("apollo-server-express");

const blogSchema = gql`
  extend type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
  }

  extend type Mutation {
    createBlog(input: CreateBlogInput): BlogResponse
    updateBlog(input: UpdateBlogInput): BlogResponse
    deleteBlog(id:ID!): MutationResponse
  }

  type Blog {
    _id: ID!
    title: String!
    content: String!
    user: User!
    comment: [Comment!]
  }

  input CreateBlogInput {
    title: String!
    content: String!
  }

  input UpdateBlogInput {
    id: ID!
    title: String
    content: String
  }

  type BlogResponse {
    message: String!
    code: Int!
    blog: Blog!
  }
`;


module.exports =  blogSchema