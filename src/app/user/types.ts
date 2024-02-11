export const types = `#graphql
  type User {
    id: ID!
    email: String!
    FirstName: String
    LastName: String
    profileimageURL: String!

    tweets: [Tweet]
    }
`;
