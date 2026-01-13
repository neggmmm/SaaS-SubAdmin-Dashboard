import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URI'),
      })
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
