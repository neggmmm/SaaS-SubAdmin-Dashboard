import { Injectable } from "@nestjs/common";
import { RestaurantDocument } from "./schema/restaurant.schema";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { RestaurantRepository } from "./restaurant.repository";

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository
  ) {}

  async createRestaurant(restaurantData: CreateRestaurantDto): Promise<RestaurantDocument> {
    return this.restaurantRepository.create(restaurantData);
  }

  async getAllRestaurants(): Promise<RestaurantDocument[]> {
    return this.restaurantRepository.findAll();
  }

  async getRestaurantById(id: string): Promise<RestaurantDocument | null> {
    return this.restaurantRepository.findById(id);
  }

  async updateRestaurant(id: string, updateData: Partial<CreateRestaurantDto>): Promise<RestaurantDocument | null> {
    return this.restaurantRepository.update(id, updateData);
  }

  async deleteRestaurant(id: string): Promise<boolean> {
    return this.restaurantRepository.delete(id);
  }
}