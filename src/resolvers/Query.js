import jwt from "jsonwebtoken";

const SECRET = "asdfas98df7";

const Query = {
  users: async (parent, args, { models }) => {
    const Users = await models.User.find();

    return Users;
  },
  items: async (parent, args, { models }) => {
    const Items = await models.Item.find();

    return Items;
  },
  verifyToken: async (parent, args, { models }) => {
    const decoded = jwt.verify(args.token, SECRET);
    const User = await models.User.findOne({ _id: decoded._id });

    if (!User) {
      throw new Error("Cannot find User");
    }

    return User;
  },
  getFridge: async (parent, args, { models }) => {
    const User = await models.User.findOne({ email: args.email });

    if (!User) {
      throw new Error("Cannot find User");
    }

    return User.fridge;
  },
  searchItemsByName: async (parent, args, { models }) => {
    const Items = await models.Item.find();
    const formattedQuery = args.input.toLowerCase();

    if (args.input == "") {
      return null;
    }

    const searchListings = Items.filter(item => {
      return item.name.toLowerCase().indexOf(formattedQuery) > -1;
    });

    return searchListings;
  }
};

export default Query;
