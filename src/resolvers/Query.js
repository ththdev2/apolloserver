import jwt from 'jsonwebtoken';

const SECRET = 'asdfas98df7';

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
      throw new Error('Cannot find User');
    }

    return User;
  }
};

export default Query;
