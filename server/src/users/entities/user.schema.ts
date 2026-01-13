import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SubAdminDocument = HydratedDocument<SubAdmin>;

@Schema({ timestamps: true })

export class SubAdmin {
    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ unique:true ,required: true })
    email: string;
    
    @Prop({ unique: true, required: true })
    phoneNumber: string;

    @Prop()
    password: string;
}

export const SubAdminSchema = SchemaFactory.createForClass(SubAdmin);