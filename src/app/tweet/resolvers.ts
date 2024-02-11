import { prismaClient } from "../../clients/db";
import { GraphQLContext } from "../../interfaces";
import { Tweet } from "@prisma/client";

interface CreateTweetPayload {
    content: string;
    imageURL?: string;
    author?: string;
}

const mutations = {
    createTweet: async (
        parent: any,
        { payload }: { payload: CreateTweetPayload },
        ctx: GraphQLContext
    ) => {
        if (!ctx.user) throw new Error('Unauthorized');
        const tweet = await prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURL,
                author: {
                    connect: { id: ctx.user.id.toString() }
                }
            },
        });

        return tweet;
    },
};

const extraResolvers = {
    Tweet: {
        author: (parent: Tweet) =>
            prismaClient.user.findUnique({ where: { id: parent.authorId } }),
    },
};


export const resolvers = { mutations, extraResolvers };
