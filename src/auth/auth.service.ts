import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "@/users/user.service";
import { HashService } from "@/common/crypto/hash.service";
import { TokenService } from "@/common/token/token.service";

@Injectable()
export class AuthService{
    constructor(
        private readonly userService: UserService,
        private readonly hashService: HashService,
        private readonly tokenService: TokenService,
    ) {}

    async login(dto: LoginDto) {
        const user = await this.userService.findUserByPhoneNumber(dto.phoneNumber);
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
        const existingUser = await this.userService.findUserByPhoneNumber(dto.phoneNumber);
        if (existingUser) {
            return { message: 'User already exists' };
        }
        const hashedPassword = await this.hashService.hashPassword(dto.password);
        await this.userService.createUser({
            phoneNumber: dto.phoneNumber,
            username: dto.username,
            password: hashedPassword,
        });
        // Implement registration logic here
        return { message: 'Registration successful' };
    }

    async getMe(userId: string) {
        const user = await this.userService.getUserById(userId);
        if(!user){
            throw new UnauthorizedException();
        }
        return{
            phoneNumber: user.phoneNumber,
            username: user.username,
        }
    }
}