import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
//import * as toStream from 'buffer-to-stream';
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

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
