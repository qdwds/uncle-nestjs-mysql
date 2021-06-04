/*
 * @Description: 文件上传相关
 * @Author: 前端伪大叔
 * @Date: 2021-05-31 11:30:49
 * @LastEditTime: 2021-06-04 16:20:57
 * @yuque: http://www.yuque.com/qdwds
 */
import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream, existsSync, readdir, readdirSync, readFileSync, rmdir, rmdirSync, unlink, unlinkSync, writeFile, writeFileSync } from 'fs';
import { join } from 'path';

import { create_upload_file, files_path, getFileName } from "../../utils/upoload_files";

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
        const { filename } = body;
        //  每个文件名称
        const file_path = filename.split(" - ")[0];
        //  文件名称 - 去除后缀名
        const file_path_name = getFileName(file_path);
        //  文件是否创建成功 public 文件夹
        const fileIsShow = await create_upload_file(files_path);

        if (!fileIsShow) {
            throw new HttpException({
                message: false
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
            const file_name_show = await create_upload_file(join(files_path, file_path_name));;
            if (!file_name_show) {
                throw new HttpException({
                    message: false
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            } else {
                const stream = createWriteStream(join(files_path, file_path_name, filename));
                stream.write(file.buffer)
            }
            return "上传成功"
        }
    }

    @Post("max_merge")
    async mergeMaxFile(@Body() body: any) {
        const { filename } = body;

        //  目录 + 文件名称
        const path_name = join(files_path, filename);
        //  取后缀的文件夹
        const file_path_name = getFileName(path_name);
        // 获取 每个切片
        console.log(file_path_name);

        readdir(file_path_name, (e, chunkList) => {
            if (e) return e;
            chunkList.sort((a: any, b: any) => a.split(" - ")[1] - b.split(" - ")[1]);
            const files = chunkList.map((chunk, index) => {
                return readFileSync(join(file_path_name, chunk))
            })
            const buffer = Buffer.concat(files);
            //  写入切片 => 多个切片合并成一个文件
            writeFileSync(path_name, buffer);
            //  删除切片
            

        });
    }
}
