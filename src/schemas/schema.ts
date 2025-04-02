import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedYear: Int!
    student: Student
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    grade: String!
    books: [Book!]
  }

  type Teacher {
    id: ID!
    name: String!
    email: String!
    subject: String!
  }

  type Query {
    books: [Book!]!
    students: [Student!]!
    teachers: [Teacher!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      publishedYear: Int!
      studentId: ID
    ): Book!
  }
`;