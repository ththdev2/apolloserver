import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    items: [Item]

    verifyToken(token: String!): User
    getFridge(email: String!): [Item]

    searchItemsByName(input: String): [Item]
  }

  type Mutation {
    register(
      name: String!
      email: String!
      password: String
      birth: Date!
      photoUrl: String
      isAdmin: Boolean
      googleLink: String
    ): Token
    deleteAccount(_id: ID!): Boolean

    SignIn(email: String!, password: String!): Token
    googleSignIn(email: String!): Token

    createItem(name: String!, container: String!): Item
    deleteItem(_id: ID!): Boolean

    pushFridgeItem(item: String!, email: String!): Boolean
    deleteFridgeItem(item: String!, email: String!): Boolean
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    birth: Date!
    password: String!
    photoUrl: String
    isAdmin: Boolean!
    googleLink: Boolean!
    fridge: [Item]
  }

  scalar Date

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
