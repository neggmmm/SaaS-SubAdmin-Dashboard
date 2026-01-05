import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async createUser(userData: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }
    async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        return !!result;
    }
}