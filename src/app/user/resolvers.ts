import axios from "axios";

const queries = {
    verifyGoogleToken: async(parent: any, {token}: {token: string}) => {
        // const googleToken = token;
        // const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
        // googleOauthURL.searchParams.set('id_token', googleToken)

        // const {data} = await axios.get(googleOauthURL.toString(), {
        //     responseType: 'json'
        // })
        // console.log(data);

        return 'ok';
    },
};

export const resolvers = { queries };