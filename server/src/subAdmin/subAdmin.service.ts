import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SubAdmin, SubAdminDocument } from "./subAdmin.schema";
import { Model } from "mongoose";

@Injectable()

export class SubAdminService {
    constructor(
        @InjectModel(SubAdmin.name)
        private readonly subAdminModel: Model<SubAdmin>,
    ) {}

    async getAllSubAdmins(): Promise<SubAdminDocument[]> {
        return this.subAdminModel.find().exec();
    }

    async findSubAdminByPhoneNumber(phoneNumber: string): Promise<SubAdminDocument | null> {
        return this.subAdminModel.findOne({ phoneNumber }).exec();
    }
    async getSubAdminById(id: string): Promise<SubAdminDocument | null> {
        return this.subAdminModel.findById(id).exec();
    }

    async createSubAdmin(subAdminData: Partial<SubAdmin>): Promise<SubAdminDocument> {
        const newSubAdmin = new this.subAdminModel(subAdminData);
        return newSubAdmin.save();
    }

    async updateSubAdmin(id: string, updateData: Partial<SubAdmin>): Promise<SubAdminDocument | null> {
        return this.subAdminModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async deleteSubAdmin(id: string): Promise<boolean> {
        const result = await this.subAdminModel.findByIdAndDelete(id).exec();
        return !!result;
    }
}