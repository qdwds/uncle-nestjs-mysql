import { Controller, HttpException, HttpStatus, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';

import { create_upload_file, files_path } from "../../utils/upoload_files";

@Controller('upload')
export class File_uploadController {

    @Post('file')
    @UseInterceptors(FileInterceptor("file"))   //  配置文件名
    async uploadFile(@UploadedFile() file) {
        const fileIsShow = await create_upload_file();
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
    async uploadFiles(@UploadedFiles() files) {
        const fileIsShow = await create_upload_file();
        if (!fileIsShow) {
            throw new HttpException({
                message: false
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
            for (const file in files) {
                files['file'].forEach(f => {
                    const stream = createWriteStream(join(`${files_path}`, f.originalname));
                    stream.write(f.buffer)
                });
            }
            return "上传成功"
        }
    }

    @Post("maxfile")
    @UseInterceptors(FileInterceptor("file"))
    uploadMaxFile(@UploadedFile() file) {
        return "1"
    }
    
    @Post("xf")
    @UseInterceptors(FileInterceptor("file"))
    uploadMaxFile1(@UploadedFile() file) {
        return "1"
    }
}


