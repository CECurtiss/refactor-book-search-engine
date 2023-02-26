const { Book, User } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, { _id, user }) => {
      if (user) {
        const userData = await User.findOne({ _id })
          .select("-__v -password")
          .populate("books");
        return userData;
      }
      throw new AuthenticationError("You must be logged in to do this");
    },
  },

  Mutations: {
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const updatedBooks = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return updatedBooks;
      }
      throw new AuthenticationError("You must be logged in to do this");
    },
  },
};

module.exports = resolvers;
