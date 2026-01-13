import { Module } from "@nestjs/common";
import { SubAdminController } from "./subAdmin.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { SubAdmin, subAdminSchema} from "./subAdmin.schema";
import { SubAdminService } from "./subAdmin.service";

@Module({
    imports: [MongooseModule.forFeature([{name: SubAdmin.name, schema: subAdminSchema}])],
    controllers: [SubAdminController],
    providers: [SubAdminService],
})

export class SubAdminModule {}