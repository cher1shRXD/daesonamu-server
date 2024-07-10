import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class UploadService {
  async getFileUrl(fileName: string): Promise<string> {
    const fileUrl = `http://file-daesonamu.kro.kr:8081/${fileName}`;
    return fileUrl;
  }
}
