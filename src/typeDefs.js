import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    getUser(token: String!): User
  }

  type Mutation {
    register(
      email: String!
      password: String
      name: String!
      isAdmin: Boolean
      social: String
    ): Token
    deleteAccount(_id: ID!): Boolean
    EmailLogin(email: String!, password: String!): Token
    GoogleLogin(email: String!): Token
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    isAdmin: Boolean!
    social: String
  }

  type Token {
    token: String!
  }
`;

export default typeDefs;
