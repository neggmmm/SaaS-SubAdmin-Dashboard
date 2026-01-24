import { IsString, IsEnum, IsNotEmpty, IsMongoId } from 'class-validator';
import { Types } from "mongoose";

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsEnum(["active", "suspended", "pending"])
  readonly status: string;

  @IsEnum(["basic", "premium", "enterprise"])
  readonly subscriptionPlan: string;

  @IsMongoId()
  readonly owner: Types.ObjectId;
}