/*
 * @Description: 
 * @Author: 前端伪大叔
 * @Date: 2021-05-31 11:30:49
 * @LastEditTime: 2021-06-03 17:57:37
 * @yuque: http://www.yuque.com/qdwds
 */
import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream, mkdir } from 'fs';
import { join } from 'path';

import { create_upload_file, files_path } from "../../utils/upoload_files";

@Controller('upload')
export class File_uploadController {

    @Post('file')
    @UseInterceptors(FileInterceptor("file"))   //  配置文件名
    async uploadFile(@UploadedFile() file) {
        const fileIsShow = await create_upload_file(files_path);
        //  创建失败 抛出错误
        if (!fileIsShow) {
            throw new HttpException({
                message: false
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
            const stream = createWriteStream(join(`${files_path}`, `${file.originalname}`));
            stream.write(file.buffer)
            return "上传成功"
        }
    }

    @Post("files")
    @UseInterceptors(FileFieldsInterceptor([
        { name: "file1", maxCount: 1 },
        { name: "file2", maxCount: 1 },
    ]))
    async uploadFiles(@UploadedFiles() files: any) {
        const fileIsShow = await create_upload_file(files_path);
        if (!fileIsShow) {
            throw new HttpException({
                message: false
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
            for (const file in files) {
                files[file].forEach(({ originalname, buffer }) => {
                    const stream = createWriteStream(join(`${files_path}`, originalname));
                    stream.write(buffer)
                });
            }
            return "上传成功"
        }
    }


    @Post("folder")
    @UseInterceptors(FileInterceptor("file"))
    async uploadfolder(@UploadedFile() file, @Body() body) {
        const fileIsShow = await create_upload_file(files_path);
        if (!fileIsShow) {
            throw new HttpException({
                message: false
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
            const { filename, filepath } = body;
            const paths = filepath.split("/");
            paths.pop();
            //  创建文件夹目录
            const upload_path = join(files_path,paths.join("/"));
            //  文件目录
            const upload_file_path = join(upload_path,filename);
            
            for (let i = 0; i < paths.length; i++) {
                const fileIsShow = await create_upload_file(upload_path);
                if (!fileIsShow) {
                    throw new HttpException({
                        message: false
                    }, HttpStatus.INTERNAL_SERVER_ERROR)
                } else {
                    const stream = createWriteStream(upload_file_path);
                    stream.write(file.buffer)
                    return "文件夹上传成功"
                }
            }
        }
    }

    @Post("max_file")
    async uploadMaxFile(@UploadedFile() file ){
        const fileIsShow = await create_upload_file(files_path);
        //  创建失败 抛出错误
        if (!fileIsShow) {
            throw new HttpException({
                message: false
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
           console.log(file);
            return "上传成功"
        }
    }
}
