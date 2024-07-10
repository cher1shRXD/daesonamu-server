import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class FileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File; // Use Express.Multer.File for file type
}
