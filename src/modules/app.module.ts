import { File_uploadModule } from './file_upload/file_upload.module';
import { Module } from '@nestjs/common';
import { UserModule } from "./user/user.module";
@Module({
    imports: [
        File_uploadModule,
        UserModule
    ],
    providers: [],
})
export class AppModule { }
