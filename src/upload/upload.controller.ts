import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file')
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file.path);
    return {
      url:`http://file-daesonamu.kro.kr:8081/${file.filename}`
    };
  }
}
