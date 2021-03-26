const { gql } = require("apollo-server");

const commentSchema = gql`
  extend type Query {
    comments: [Comment!]
  }
  extend type Mutation {
    createComment(input: CreateComemntInput): CreateCommentResponse
  }

  type Comment {
    _id: ID!
    content: String
    user: User
    blog: Blog
  }

  type CreateCommentResponse {
    message: String!
    code: Int!
    comment: Comment
  }

  input CreateComemntInput {
    id: ID!
    content: String!
  }
`;

module.exports = commentSchema;
