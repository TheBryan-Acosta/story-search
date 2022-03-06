const { gql } = require("apollo-server-express");
const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		bookCount: Int
		savedBooks: [Book]
	}

	type Book {
		_id: ID
		authors: [String]
		description: String
		bookId: String
		link: String
		image: String
		title: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
		user(username: String!): User
		users: [User]!
		books: [Book]
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		saveBook(BookInfo: String!): User
		removeBook(bookId: ID!): User
	}
`;

module.exports = typeDefs;
