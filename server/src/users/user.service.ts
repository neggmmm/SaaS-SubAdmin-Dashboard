import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./entities/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {}

    async getAllUsers(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findUserByPhoneNumber(phoneNumber: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ phoneNumber }).exec();
    }
    async getUserById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async createUser(userData: CreateUserDto): Promise<UserDocument> {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }
    async updateUser(id: string, updateData: Partial<User>): Promise<UserDocument | null> {
        return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        return !!result;
    }
}