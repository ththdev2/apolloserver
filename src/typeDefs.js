import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    items: [Item]

    verifyToken(token: String!): User
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

    emailLogin(email: String!, password: String!): Token
    socialLogin(email: String!): Token

    createItem(name: String!, container: String!): Item
    deleteItem(_id: ID!): Boolean

    pushFridgeItem(item: String!, email: String!): Boolean
    deleteFridgeItem(item: String!, email: String!): Boolean
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    isAdmin: Boolean!
    social: String
    fridge: [Item]
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
