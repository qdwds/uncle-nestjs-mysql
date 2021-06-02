import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { Logger } from "@nestjs/common";
import { HttpExceptionFilter  } from "./filters/httpException.filter";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from 'path';
import { ResponseInterceptor } from "./interceptors/response.interceptor";
const PORT:number = 5000;


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);
  //  异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  //  response 返回
  app.useGlobalInterceptors(new ResponseInterceptor())
  //  静态资源目录
  app.useStaticAssets(join(__dirname,"..","public"),{prefix:"/static"})


  Logger.log(`http://localhost:${PORT}`)
  await app.listen(PORT);
}
bootstrap();
