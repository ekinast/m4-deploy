import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UsePipes,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinSizeValidatorPipe } from '../pipes/min-size-validator.pipe';
import { ProductsDBService } from '../products/productsDB.service';
import { ProductDto } from '../products/dto/Product.dto';
import { AuthGuard } from '../auth/auth.guards';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Express } from 'express';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly productsDBService: ProductsDBService,
  ) {}

  //? Subir archivos a Cloudinay.
  @Post('uploadImage/:id')
  @ApiOperation({ summary: 'Upload an image for a product' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The image to upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The URL of the uploaded image',
    schema: {
      type: 'object',
      properties: {
        imageUrl: { type: 'string' },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidatorPipe)
  async putUserImages(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100000,
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
    const myImg = await this.filesService.uploadImage(file);
    const imgUrl = myImg.secure_url;
    //console.log('imgUrl', imgUrl);

    const productDto: Partial<ProductDto> = {
      imgUrl: imgUrl,
    };
    const updateProduct = await this.productsDBService.updateProduct(
      id,
      productDto,
    );
    return updateProduct;
    //return file;
  }
}
