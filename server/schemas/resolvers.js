const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		// check if user is logged in
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select(
					"-__v -password"
				);

				return userData;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		// get all users
		users: async () => {
			return User.find().select("-__v -password");
		},
		// get one user
		user: async (parent, { username }) => {
			return User.findOne({ username }).select("-__v -password");
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);

			return { token, user };
		},
		saveBook: async (parent, { input }, { user }) => {
			if (user) {
				const updatedUser = await User.findByIdAndUpdate(
					{ _id: user._id },
					{ $addToSet: { savedBooks: input } },
					{ new: true }
				);

				return updatedUser;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		removeBook: async (parent, { bookId }, { user }) => {
			if (user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: user._id },
					{ $pull: { savedBooks: { bookId: bookId } } },
					{ new: true }
				);

				return updatedUser;
			}

			throw new AuthenticationError("You must be logged in");
		},
	},
};

module.exports = resolvers;
