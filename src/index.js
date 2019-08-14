import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import models from "./models";
import typeDefs from "./typeDefs";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";

const db = mongoose.connection;
const uri =
  "mongodb+srv://admin:pearlpearl@pickercluster-0lnzs.gcp.mongodb.net/test?retryWrites=true&w=majority";
db.once("open", function() {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connect(uri, { useNewUrlParser: true });

const context = {
  models,
  db
};

const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.listen().then(({ url }) => {
  console.log(`Apollo Server ready at ${url}`);
});
