import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';

const JWT_SECRET = 'your_jwt_secret'; // Use environment variables in production

export class AuthService {
    static async register(username: string, password: string): Promise<void> {
        const passwordHash = await bcrypt.hash(password, 10);
        await UserModel.createUser(username, passwordHash);
    }

    static async login(username: string, password: string): Promise<string> {
        const user = await UserModel.findUserByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    }

    static verifyToken(token: string): any {
        return jwt.verify(token, JWT_SECRET);
    }
}
