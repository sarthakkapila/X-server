import JWT from 'jsonwebtoken';
import { User } from '@prisma/client';
import { JWTUser } from '../interfaces';

const JWT_SECRET = "S3Cr3T";

class JWTService {
    public static async generateTokenforUser(userId: User) {
        const payload: JWTUser = {
            id: userId?.id,
            email: userId.email,
            FirstName: userId.Firstname,
        };
        const token = JWT.sign(payload, JWT_SECRET)
        return token;
    }

    public static decodeToken(token: string) {

            try {
                return JWT.verify(token, JWT_SECRET) as JWTUser;

            } catch (error) {
                return null;
            }
    }
}

export default JWTService;