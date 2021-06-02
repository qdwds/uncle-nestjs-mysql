
 import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
/**
 *  请求错误过滤器
 * @export
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();  //  content
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus(); //  获取状态
    const exceptionRes: any = exception.getResponse();  //  获取响应的错误信息
    //  响应的信息
    const { error, message } = exceptionRes;

    response.header('Content-Type', 'application/json; charset=utf-8');
    console.log(message);
    
    response.status(status).json({
      status,
      queryTime: new Date().toISOString(),
      path: request.url,
      error,
      message,
    })
    Logger.error(`请求错误：${request.url}`);
  }
}