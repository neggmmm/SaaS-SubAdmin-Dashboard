import { Controller, Delete, Get, HttpCode, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @HttpCode(200)
    @Post('create')
    createUser() {
        return { message: 'User created successfully' };
    }
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    @Get(':id')
    getUserById() {
        return { message: 'User details by ID' };
    }
    @Patch(':id')
    updateUser() {
        return { message: 'User updated successfully' };
    }
    @Delete(':id')
    deleteUser() {
        return { message: 'User deleted successfully' };
    }
}