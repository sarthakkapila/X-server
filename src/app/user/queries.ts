import { graphql } from "graphql";

export const queries = `#graphql
    verifyGoogleToken(token: String!): String
    getCurrentUser: User
    getUserById(id: ID!): User
`;

export const getCurrentUserQuery =`
    query GetCurrentuser{
        getCurrentUser{
            id
            email
            Firstname
            profileimageURL
    }
    }
    `;
