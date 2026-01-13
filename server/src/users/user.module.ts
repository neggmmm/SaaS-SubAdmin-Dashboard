import { SubAdmin,SubAdminSchema } from "@/users/entities/user.schema";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: SubAdmin.name, schema: SubAdminSchema }]),
    ],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule {}