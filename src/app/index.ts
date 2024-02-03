import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

export async function startApolloServer() {
    const server = new ApolloServer({ 
        typeDefs: "",
        resolvers: {}
     });
    await server.start();

    app.use('/graphql', expressMiddleware(server));   

    return app;
}

