import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { User } from "./user"
import { graphQLContext } from "../interfaces";
import JWTService from "../services/jwt";


const app = express();
app.use(cors());
app.use(bodyParser.json());

export async function startApolloServer() {
    const server = new ApolloServer<graphQLContext>({ 
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

    app.use('/graphql', expressMiddleware(server, {
        context: async ({req, res}) => {
            return {
                user: req.headers.authorization ? JWTService.decodeToken(req.headers.authorization.split('Bearer')[1]) : undefined,

            };
        }
        }));

    return app;
}

