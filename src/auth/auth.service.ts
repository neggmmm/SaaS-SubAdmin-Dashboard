import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "@/users/user.service";
import { HashService } from "@/common/crypto/hash.services";

@Injectable()
export class AuthService{
    constructor(
        private readonly userService: UserService,
        private readonly hashService: HashService,
    ) {}

    async login(dto: LoginDto) {
        const user = await this.userService.findUserByPhoneNumber(dto.phoneNumber);
        if(!user){
            throw new Error('User not found');
        }
        const isMatch = await this.hashService.comparePasswords(dto.password, user.password);
        if (isMatch) {
            return { message: 'Login successful' };
        } else {
            return { message: 'Invalid credentials' };
        }
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
}