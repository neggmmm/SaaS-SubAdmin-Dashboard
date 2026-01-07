import { Module } from "@nestjs/common";
import { HashService } from "./hash.services";

@Module({
    providers: [HashService],
    exports: [HashService],
})
export class HashModule {}