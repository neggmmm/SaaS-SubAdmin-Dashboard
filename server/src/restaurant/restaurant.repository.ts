import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Restaurant, RestaurantDocument } from "@/restaurant/schema/restaurant.schema";
import { Model } from "mongoose";
import { IRestaurantRepository } from "./interfaces/restaurant-repository.interface";

@Injectable()
export class RestaurantRepository implements IRestaurantRepository {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>
  ) {}

  async create(restaurantData: any): Promise<RestaurantDocument> {
    const newRestaurant = new this.restaurantModel(restaurantData);
    return newRestaurant.save();
  }

  async findAll(): Promise<RestaurantDocument[]> {
    return this.restaurantModel.find().exec();
  }

  async findById(id: string): Promise<RestaurantDocument | null> {
    return this.restaurantModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<any>): Promise<RestaurantDocument | null> {
    return this.restaurantModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.restaurantModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}