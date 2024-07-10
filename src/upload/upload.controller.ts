import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('upload')
@ApiBearerAuth('access-token')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '/var/www/files',
        filename: (req, file, cb) => {
          const fileExtName = path.extname(file.originalname);
          const fileName = `${uuidv4()}${fileExtName}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    const fileUrl = await this.uploadService.getFileUrl(file.filename);
    return { url: fileUrl };
  }
}
