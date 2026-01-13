import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "@/users/user.module";
import { HashModule } from "@/common/crypto/hash.module";
import { TokenModule } from "@/common/token/token.module";

@Module({
    imports: [UserModule, HashModule,TokenModule],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule {}