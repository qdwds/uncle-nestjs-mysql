import { File_uploadController } from './file_upload.controller';
import { File_uploadService } from './file_upload.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        File_uploadController,],
    providers: [
        File_uploadService,],
})
export class File_uploadModule { }
