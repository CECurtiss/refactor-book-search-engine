const { gql } = require('apollo-server-express');

const typeDefs = gql`

input SaveBookInput {
    description: String
    bookID: String
    image: String
    link: String
    authors: [String]
}

type Query {
    me: User
}

type Mutation {
    saveBook(input: SaveBookInput!): User
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    deleteBook(bookId: String!): User
}

`;

module.exports = typeDefs;