import jwt from "jsonwebtoken";
const SECRET = "asdfas98df7";

const Mutation = {
  register: async (parent, args, { models }) => {
    const User = await models.User.findOne({ email: args.email });

    if (User) {
      throw new Error("Please provide a unique email");
    }

    const newUser = new models.User({
      name: args.name,
      email: args.email,
      password: args.password,
      isAdmin: args.isAdmin ? args.isAdmin : false,
      social: args.social
    });

    try {
      await newUser.save();
    } catch (e) {
      throw new Error("Cannot register");
    }

    const token = jwt.sign({ _id: newUser._id }, SECRET);

    return { token };
  },
  deleteAccount: async (parent, args, { models }) => {
    const User = await models.User.findOne({ _id: args._id });

    if (!User) {
      throw new Error("Cannot find User");
    }

    try {
      await models.User.deleteOne({ _id: args._id });
    } catch (e) {
      throw new Error("Cannot delete Account");
    }

    return true;
  },
  emailLogin: async (parent, args, { models }) => {
    const User = await models.User.findOne({ email: args.email });

    if (!User) {
      throw new Error("Cannot find User");
    }

    if (User.social === "Google") {
      throw new Error("Please login with Google");
    }

    if (User.password !== args.password) {
      throw new Error("Wrong Password");
    }

    const token = jwt.sign({ _id: User._id }, SECRET);

    return { token };
  },
  socialLogin: async (parent, args, { models }) => {
    const User = await models.User.findOne({ email: args.email });

    if (!User) {
      throw new Error("You need to register");
    }

    if (!User.social) {
      try {
        await User.updateOne({ social: "Google" });
      } catch (e) {
        throw new Error("Cannot update");
      }
    }

    const token = jwt.sign({ _id: User._id }, SECRET);

    return { token };
  },

  createItem: async (parent, args, { models }) => {
    const Item = await models.Item.findOne({ name: args.name });

    if (Item) {
      throw new Error("Please provide a unique name");
    }

    const newItem = new models.Item({
      name: args.name,
      container: args.container
    });

    try {
      await newItem.save();
    } catch (e) {
      throw new Error("Cannot save item");
    }

    return newItem;
  },
  deleteItem: async (parent, args, { models }) => {
    const Item = await models.Item.findOne({ _id: args._id });

    if (!Item) {
      throw new Error("Cannot find Item");
    }

    try {
      await models.Item.deleteOne({ _id: args._id });
    } catch (e) {
      throw new Error("Cannot delete Item");
    }

    return true;
  },
  pushFridgeItem: async (parent, args, { models }) => {
    const User = await models.User.findOne({ email: args.email });
    const Item = await models.Item.findOne({ name: args.item });

    if (!User) {
      throw new Error("Cannot find User");
    }

    if (!Item) {
      throw new Error("Cannot find Item");
    }

    User.fridge.some(item => {
      if (item.name == Item.name) {
        throw new Error("Already have one");
      }
    });

    try {
      await User.updateOne({ $push: { fridge: Item } });
    } catch (e) {
      throw new Error("Cannot Save Item");
    }

    return true;
  },
  deleteFridgeItem: async (parent, args, { models }) => {
    const User = await models.User.findOne({ email: args.email });
    const Item = User.fridge.find(item => {
      return item.name == args.item;
    });

    if (!User) {
      throw new Error("Cannot find User");
    }

    if (!Item) {
      throw new Error("Cannot find item in Fridge");
    }

    try {
      await User.updateOne({ $pull: { fridge: Item } });
    } catch (e) {
      throw new Error("Cannot delete item");
    }

    return true;
  }
};

export default Mutation;
