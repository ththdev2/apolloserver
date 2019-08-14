const Query = {
  users: async (parent, args, { models }) => {
    const Users = await models.User.find();

    return Users;
  }
};

export default Query;
