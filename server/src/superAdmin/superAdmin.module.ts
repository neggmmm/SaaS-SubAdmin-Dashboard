import { Module } from "@nestjs/common";
import { SubAdminController } from "./superAdmin.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { SubAdmin, subAdminSchema} from "./superAdmin.schema";
import { SubAdminService } from "./superAdmin.service";

@Module({
    imports: [MongooseModule.forFeature([{name: SubAdmin.name, schema: subAdminSchema}])],
    controllers: [SubAdminController],
    providers: [SubAdminService],
    exports: [SubAdminService],
})

export class SuperAdminModule {}