import { Module } from '@nestjs/common';
import { AppModule } from "./modules/app.module";
import { ConfigModule, ConfigService } from "nestjs-config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { resolve } from "path";

@Module({
  imports: [
    AppModule,
    //  配置模块引用地址
    ConfigModule.load(resolve(__dirname,'utils','**/!(*.d).{ts,js}')),
    //  mysql 数据库
    TypeOrmModule.forRootAsync({
      useFactory: (utils: ConfigService) => utils.get('mysql'),
      inject: [ConfigService] //  注入
    }),
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
