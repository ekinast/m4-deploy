import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Put,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinSizeValidatorPipe } from 'src/pipes/min-size-validator.pipe';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  //? Subir archivos a Cloudinay.
  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidatorPipe)
  putUserImages(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000,
            message: 'El archivo debe ser menor a 100kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    //console.log('file', file);
    return this.filesService.uploadImage(file);
    //return file;
  }

  // @Post('uploadImage/:id')
  // @UseInterceptors(FileInterceptor('image'))
  // getUserImages(@UploadedFile() file: Express.Multer.File) {
  //   //return file;
  //   return this.filesService.uploadImage(file);
  // }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
