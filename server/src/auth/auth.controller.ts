import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import type { Response, Request } from "express";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const result = await this.authService.login(dto);
        res.cookie('access_token', result.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        return { message: "Login successful" };
    }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }
    
    @UseGuards(AuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async Logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token',{
            httpOnly:true,
            secure:false,
            sameSite:'lax'
        })
        return {message:"Logged out successfully"}
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getMe(@Req() req: Request) {
        return this.authService.getMe(req.user!.userId);
    }
}