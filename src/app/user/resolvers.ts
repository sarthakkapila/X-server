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
            where: data.email
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

        const usertoken = await JWTService.generateToken(user.id);
        return 'ok';
    },
};

export const resolvers = { queries };