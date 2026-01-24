import { RestaurantDocument } from "../schema/restaurant.schema";
import { CreateRestaurantDto } from "../dto/create-restaurant.dto";

export interface IRestaurantService {
  createRestaurant(dto: CreateRestaurantDto): Promise<RestaurantDocument>;
  getAllRestaurants(): Promise<RestaurantDocument[]>;
  getRestaurantById(id: string): Promise<RestaurantDocument | null>;
  updateRestaurant(id: string, updateData: Partial<CreateRestaurantDto>): Promise<RestaurantDocument | null>;
  deleteRestaurant(id: string): Promise<boolean>;
}