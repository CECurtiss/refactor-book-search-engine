const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

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

  Mutation: {
    saveBook: async (parent, { _id, book }, { user }) => {
      if (user) {
        const updatedBooks = await User.findOneAndUpdate(
          { _id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return updatedBooks;
      }
      throw new AuthenticationError("You must be logged in to do this");
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong password!");
      }
    },
    removeBook: async (parent, { _id, bookId }, { user }) => {
      if (user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Couldn't find user with this id!");
    },
  },
};

module.exports = resolvers;
