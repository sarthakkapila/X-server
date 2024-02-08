export interface JWTUser {
    id: String;
    email: String;
}

export interface graphQLContext {
    user?: JWTUser;
}
