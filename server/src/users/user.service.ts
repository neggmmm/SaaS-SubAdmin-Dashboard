import { Injectable } from "@nestjs/common";
import { User, UserDocument} from "./user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly subAdminModel: Model<UserDocument>,
    ) {}

    async getAllUsers(): Promise<UserDocument[]> {
        return this.subAdminModel.find().exec();
    }

    async findUserByPhoneNumber(phoneNumber: string): Promise<UserDocument | null> {
        return this.subAdminModel.findOne({ phoneNumber }).exec();
    }
    async getUserById(id: string): Promise<UserDocument | null> {
        return this.subAdminModel.findById(id).exec();
    }

    async createUser(userData: CreateUserDto): Promise<UserDocument> {
        const newUser = new this.subAdminModel(userData);
        return newUser.save();
    }
    async updateUser(id: string, updateData: Partial<User>): Promise<UserDocument | null> {
        return this.subAdminModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await this.subAdminModel.findByIdAndDelete(id).exec();
        return !!result;
    }
}