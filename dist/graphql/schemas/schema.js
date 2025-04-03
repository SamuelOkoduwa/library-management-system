"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
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
    teacher: Teacher!
    books: [Book!]
  }

  type Teacher {
    id: ID!
    name: String!
    email: String!
    subject: String!
    students: [Student!]
  }

  type Query {
    # Books
    books: [Book!]!
    book(id: ID!): Book
    booksByStudent(studentId: ID!): [Book!]!
    
    # Students
    students: [Student!]!
    studentsByTeacher(teacherId: ID!): [Student!]!
    
    # Teachers
    teachers: [Teacher!]!
  }

  type Mutation {
    # Book operations
    createBook(
      title: String!
      author: String!
      publishedYear: Int!
      studentId: ID
    ): Book!
    updateBook(
      id: ID!
      title: String
      author: String
      publishedYear: Int
      studentId: ID
    ): Book!
    deleteBook(id: ID!): Book!
    
    # Student operations
    assignBookToStudent(bookId: ID!, studentId: ID!): Book!
  }
`;
