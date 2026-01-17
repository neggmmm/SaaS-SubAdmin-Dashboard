import { Types } from "mongoose";

export class CreateRestaurantDto {
  readonly name: string;
  readonly address: string;
  readonly phoneNumber: string;
  readonly status: string;
  readonly subscriptionPlan: string;
  readonly owner: Types.ObjectId;
}