import { Injectable } from "@nestjs/common";
import { SubAdmin, SubAdminDocument } from "./entities/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(SubAdmin.name)
        private readonly subAdminModel: Model<SubAdminDocument>,
    ) {}

    async getAllUsers(): Promise<SubAdminDocument[]> {
        return this.subAdminModel.find().exec();
    }

    async findUserByPhoneNumber(phoneNumber: string): Promise<SubAdminDocument | null> {
        return this.subAdminModel.findOne({ phoneNumber }).exec();
    }
    async getUserById(id: string): Promise<SubAdminDocument | null> {
        return this.subAdminModel.findById(id).exec();
    }

    async createUser(userData: CreateUserDto): Promise<SubAdminDocument> {
        const newSubAdmin = new this.subAdminModel(userData);
        return newSubAdmin.save();
    }
    async updateUser(id: string, updateData: Partial<SubAdmin>): Promise<SubAdminDocument | null> {
        return this.subAdminModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await this.subAdminModel.findByIdAndDelete(id).exec();
        return !!result;
    }
}