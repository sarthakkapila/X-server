import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";

interface GoogleTokenResult {
    iss: string,
    azp: string,
    aud: string,
    sub: string,
    email: string,
    email_verified: string,
    nbf: string,
    name: string,
    picture: string,
    given_name: string,
    locale: string,
    iat: string,
    exp: string,
    jti: string,
    alg: string,
    kid: string,
    typ: string
}

const queries = {
    verifyGoogleToken: async(parent: any, {token}: {token: string}) => {
        const googleToken = token;
        const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
        googleOauthURL.searchParams.set('id_token', googleToken)


        const {data} = await axios.get(googleOauthURL.toString(), {
            responseType: 'json'
        })

        const user = await prismaClient.user.findUnique({
            where : {email: data.email}
        });

        if(!user){
            await prismaClient.user.create({
                data: {
                    email: data.email,
                    Firstname: data.given_name,
                    profileimageURL: data.picture
                }
            })
        }

        const userInDb = await prismaClient.user.findUnique({
            where : {email: data.email}
        });

        if(!userInDb) throw new Error('User not found');

        const usertoken = await JWTService.generateTokenforUser(userInDb);
        return usertoken;
    },
    getCurrentUser: async(parent: any, args: any, ctx: any) => {
        console.log(ctx);
        const id = ctx.user.id;
        if(!id) throw new Error('User not found');

        const user = await prismaClient.user.findUnique({ where: {id: id}});
        return user;
    }
};

export const resolvers = { queries };