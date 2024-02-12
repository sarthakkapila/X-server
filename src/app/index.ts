import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { User } from "./user"
import { GraphQLContext } from "../interfaces";
import JWTService from "../services/jwt";
import { Tweet } from "./tweet";


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/health", (req, res) =>
res.status(200).json({ message: "Everything is good" })
);

export async function startApolloServer() {
    const graphqlServer = new ApolloServer<GraphQLContext>({ 
        typeDefs:`
        ${User.types}
        ${Tweet.types}

            type Query {
                ${User.queries}
                ${Tweet.queries}
            }
            
            type Mutation {
                ${Tweet.mutations}
            }
            `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
            Mutation: {
                ...Tweet.resolvers.mutations,
            },
            ...Tweet.resolvers.extraResolvers,
        }
     });
    await graphqlServer.start();

    app.use(
        "/graphql",
        expressMiddleware(graphqlServer, {
          context: async ({ req, res }) => {
            return {
              user: req.headers.authorization
                ? JWTService.decodeToken(
                    req.headers.authorization.split("Bearer ")[1]
                  )
                : undefined,
            };
          },
        })
      );    
    return app;
}

