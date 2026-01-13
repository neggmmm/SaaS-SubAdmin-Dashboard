import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { HashService } from "@/common/crypto/hash.service";
import { TokenService } from "@/common/token/token.service";
import { SubAdminService } from "@/subAdmin/subAdmin.service";

@Injectable()
export class AuthService{
    constructor(
        private readonly subAdminService: SubAdminService,
        private readonly hashService: HashService,
        private readonly tokenService: TokenService,
    ) {}

    async login(dto: LoginDto) {
        const user = await this.subAdminService.findSubAdminByPhoneNumber(dto.phoneNumber);
        if(!user){
            throw new UnauthorizedException();
        }
        const isMatch = await this.hashService.comparePasswords(dto.password, user.password);

        if (!isMatch) {
            return { message: 'Invalid credentials' };
        } 
        return {token: this.tokenService.generateToken(user._id.toString())};
    }
    async register(dto: RegisterDto) {
        const existingUser = await this.subAdminService.findSubAdminByPhoneNumber(dto.phoneNumber);
        if (existingUser) {
            return { message: 'User already exists' };
        }
        const hashedPassword = await this.hashService.hashPassword(dto.password);
        await this.subAdminService.createSubAdmin({
            phoneNumber: dto.phoneNumber,
            email: dto.email,
            username: dto.username,
            password: hashedPassword,
        });
        return { message: 'Registration successful' };
    }
    async getMe(userId: string) {
        const user = await this.subAdminService.getSubAdminById(userId);
        if(!user){
            throw new UnauthorizedException();
        }
        return{
            phoneNumber: user.phoneNumber,
            username: user.username,
            email: user.email,
        }
    }
}