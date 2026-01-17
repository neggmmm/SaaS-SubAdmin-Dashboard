import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Restaurant, RestaurantDocument } from "./schema/restaurant.schema";
import { Model } from "mongoose";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

@Injectable()

export class RestaurantService{

    constructor(
        @InjectModel(Restaurant.name)
        private readonly restaurantModel :  Model<RestaurantDocument>
    ){}
    async createRestaurant(restaurantData : CreateRestaurantDto) : Promise<RestaurantDocument> {
        const newRestaurant = new this.restaurantModel(restaurantData);
        return newRestaurant.save();
    }


    async getAllRestaurants() : Promise<RestaurantDocument[]>{
        return this.restaurantModel.find().exec();
    }

    async getRestaurantById(id:string): Promise<RestaurantDocument | null>{
        return this.restaurantModel.findById(id);
    }

    async updateRestaurant(id:string, updateData: Partial<Restaurant>) : Promise<RestaurantDocument | null>{
        return this.restaurantModel.findByIdAndUpdate(id,updateData, { new: true }).exec();
    }

    async DeleteRestaurant(id:string) : Promise<boolean>{
        const deleted = this.restaurantModel.findByIdAndDelete(id).exec();
        return !!deleted;
    }
}