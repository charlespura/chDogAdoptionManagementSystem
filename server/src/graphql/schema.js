const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Dog {
    id: ID!
    name: String!
    breed: String!
    age: Int!
    gender: String!
    status: String!
    imageUrl: String
    description: String
  }

  type AdoptionApplication {
    id: ID!
    userId: ID!
    dogId: ID!
    message: String!
    status: String!
    createdAt: String!
    dogName: String
    userName: String
    userEmail: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input DogInput {
    name: String!
    breed: String!
    age: Int!
    gender: String!
    status: String!
    imageUrl: String
    description: String
  }

  input AdoptionInput {
    dogId: ID!
    message: String!
  }

  type Query {
    me: User
    getDogs(status: String, breed: String): [Dog!]!
    getDog(id: ID!): Dog
    getApplications: [AdoptionApplication!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    addDog(input: DogInput!): Dog!
    updateDog(id: ID!, input: DogInput!): Dog!
    deleteDog(id: ID!): Boolean!
    applyAdoption(input: AdoptionInput!): AdoptionApplication!
    updateApplicationStatus(id: ID!, status: String!): AdoptionApplication!
  }
`);
