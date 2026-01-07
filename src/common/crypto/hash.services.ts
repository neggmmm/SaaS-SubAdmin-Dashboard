import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashService {
    async hashPassword(password: string): Promise<string> {
        const hashed = await bcrypt.hash(password, 10);
        return hashed;
    }
    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}