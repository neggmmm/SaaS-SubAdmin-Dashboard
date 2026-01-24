import { RestaurantDocument } from "../schema/restaurant.schema";

export interface IRestaurantRepository {
  create(restaurantData: any): Promise<RestaurantDocument>;
  findAll(): Promise<RestaurantDocument[]>;
  findById(id: string): Promise<RestaurantDocument | null>;
  update(id: string, updateData: Partial<any>): Promise<RestaurantDocument | null>;
  delete(id: string): Promise<boolean>;
}