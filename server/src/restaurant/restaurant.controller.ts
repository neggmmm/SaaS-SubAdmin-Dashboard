import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { RestaurantService } from "./restaurant.service";

@Controller()

export class RestaurantController{
    constructor(
        private readonly restaurantService : RestaurantService
    ){}

    @Post()
    createRestaurant(@Body() dto:CreateRestaurantDto ,@Req() req: Request,){
        return this.restaurantService.createRestaurant(dto)
    }

    @Get()
    getAllRestaurants(){
        return this.restaurantService.getAllRestaurants()
    }

    @Get(':id')
    getRestaurantById(@Param('id') id:string){
        return this.restaurantService.getRestaurantById(id)
    }

    @Patch(':id')
    updateRestaurant(@Param('id') id:string, @Body() updateData: Partial<CreateRestaurantDto>){
        return this.restaurantService.updateRestaurant(id,updateData)
    }

    @Delete(":id")
    deleteRestaurant(@Param('id') id:string){
        return this.restaurantService.DeleteRestaurant(id)
    }
}