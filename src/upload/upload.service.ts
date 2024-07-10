import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Express } from 'express'; 
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly uploadPath = '/var/www/files'; // Adjust this path as necessary

  async saveFile(file: Express.Multer.File): Promise<{ url: string }> {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const filePath = join(this.uploadPath, fileName);

    await writeFile(filePath, file.buffer);

    return { url: `http://file-daesonamu.kro.kr:8081/${fileName}` };
  }
}
