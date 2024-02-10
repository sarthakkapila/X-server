export interface JWTUser {
    id: String;
    email: String;
    FirstName: String;
}

export interface GraphQLContext {
    user?: JWTUser;
}
