import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {UploadService} from "./upload.service";
import {FilesInterceptor} from "@nestjs/platform-express";

@ApiTags('uploads')
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }
    @Post('')
    @UseInterceptors(FilesInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log('File', file)
    }
}
