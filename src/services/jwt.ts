import JWT from 'jsonwebtoken';
import { User } from '@prisma/client';
import { JWTUser } from '../interfaces';

const JWT_SECRET = "S3Cr3T";

class JWTService {
    public static async generateToken(userId: User) {
        const payload: JWTUser = {
            id: userId?.id,
            email: userId.email
        };

        const token = JWT.sign(payload, JWT_SECRET)
        return token;
    }

    public static decodeToken(token: string) {
        return JWT.verify(token, JWT_SECRET) as JWTUser;
    }
}

export default JWTService;