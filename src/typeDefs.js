import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    getUser(token: String!): User
    items: [Item]
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

    createItem(name: String!, container: String!): Item
    deleteItem(_id: ID!): Boolean
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

  type Item {
    _id: ID!
    name: String!
    container: String!
  }
`;

export default typeDefs;
