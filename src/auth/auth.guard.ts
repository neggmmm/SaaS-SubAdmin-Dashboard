import { TokenService } from "@/common/token/token.service";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: TokenService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const token = req.cookies?.access_token;

        if (!token) {
            throw new UnauthorizedException('No Token Provided');
        }
        try {
            const payload = await this.jwtService.verifyToken(token);
            req.user = {
                userId: payload.sub,
            };
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid Token');
        }
    }
}