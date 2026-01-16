import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Restaurant } from "./restaurant.schema";
import { User } from "@/users/user.schema";

@Schema({timestamps:true})

export class RestaurantUser{

    @Prop({type:Types.ObjectId, ref:Restaurant.name, required:true})
    restaurantId:Types.ObjectId;

    @Prop({Type:Types.ObjectId, ref:User.name, required:true})
    userId: Types.ObjectId;

    @Prop({required:true})
    role:String;

    @Prop({required:true, default:0})
    points:Number;
}