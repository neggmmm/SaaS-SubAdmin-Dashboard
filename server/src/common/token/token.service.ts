import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
    constructor(private readonly config: ConfigService) { }
    generateToken(userId: string): string {
        return jwt.sign(
            {},
            this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
            {
                subject: userId,
                expiresIn: '15m',
            },
        );
    }

    verifyToken(token: string): any {
        return jwt.verify(token, this.config.getOrThrow<string>('JWT_ACCESS_SECRET'));
    }
}