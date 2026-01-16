import { User } from "@/users/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps: true})

export class Restaurant {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({required:true,enum:["active", "suspended", "pending"], default:"pending"})
    status:String;
    
    @Prop({required:true,enum:["basic", "premium", "enterprise"], default:"basic"})
    subscriptionPlan: String;

    @Prop({type: Types.ObjectId, ref: User.name, required: true })
    owner: Types.ObjectId;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);