import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @HttpCode(200)
    @Post('create')
    createUser(@Body() dto:CreateUserDto) {
        return this.userService.createUser(dto);
    }
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateData: Partial<CreateUserDto>) {
        return this.userService.updateUser(id, updateData);
    }
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}