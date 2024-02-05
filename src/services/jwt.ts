import JWT from 'jsonwebtoken';
import { prismaClient } from '../clients/db';

const JWT_SECRET = "S3Cr3T";

class JWTService {
    public static async generateToken(userId: user) {

        const user = prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });
        const payload = {
            id: user.id
            email: user.email,
        }

        const token = JWT.sign(payload, JWT_SECRET)
        return token;
    }
}

export default JWTService;