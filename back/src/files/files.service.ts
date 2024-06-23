import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class FilesService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );
      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);
      readableStream.pipe(upload);
    });
  }
}
