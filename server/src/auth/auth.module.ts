import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { HashModule } from "@/common/crypto/hash.module";
import { TokenModule } from "@/common/token/token.module";
import { SuperAdminModule } from "@/superAdmin/superAdmin.module";

@Module({
    imports: [SuperAdminModule, HashModule,TokenModule],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule {}