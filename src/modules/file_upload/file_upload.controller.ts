/*
 * @Description: 文件上传相关
 * @Author: 前端伪大叔
 * @Date: 2021-05-31 11:30:49
 * @LastEditTime: 2021-06-03 22:27:50
 * @yuque: http://www.yuque.com/qdwds
 */
import { Body, Controller, Get, HttpException, HttpStatus, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream, mkdir, readdir, readdirSync } from 'fs';
import { join, resolve } from 'path';

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
            const upload_path = join(files_path, paths.join("/"));
            //  文件目录
            const upload_file_path = join(upload_path, filename);

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
    @UseInterceptors(FileInterceptor("file"))
    async uploadMaxFile(@UploadedFile() file, @Body() body) {
        // console.log(file);
        const { filename } = body;
        const path_name = filename.split(" - ")[0];
        const fileIsShow = await create_upload_file(files_path);
        //  创建失败 抛出错误
        if (!fileIsShow) {
            throw new HttpException({
                message: false
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        } else {

            const path_name_show = await create_upload_file(join(files_path, path_name));;
            if (!path_name_show) {
                throw new HttpException({
                    message: false
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            } else {
                const stream = createWriteStream(join(files_path, path_name, filename));
                stream.write(file.buffer)
            }

            return "上传成功"
        }
    }

    @Post("max_merge")
    async mergeMaxFile(@Body() body){
        const { filename } = body;
        const path_name = join(files_path,filename)
        const chunkList = await readdirSync(path_name);
        chunkList.sort((a:any,b:any)=>a.split(" - ")[1] - b.split(" - ")[1]);
        console.log(chunkList);
        chunkList.map((chunk,index)=>{
            console.log(chunk);
        })
        return 'mearge'
    }

    pipStream(){
        new Promise(resolve =>{

        })
    }
}
