import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { User } from "./user"

const app = express();
app.use(cors());
app.use(bodyParser.json());

export async function startApolloServer() {
    const server = new ApolloServer({ 
        typeDefs:`
        ${User.types}
            type Query {
                ${User.queries}
            }`,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
        }
     });
    await server.start();

    app.use('/graphql', expressMiddleware(server));   

    return app;
}

