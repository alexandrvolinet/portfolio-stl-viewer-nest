import {
  Body,
  Controller,
  UseInterceptors,
  UploadedFile,
  Get,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/order.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  async getAllOrders() {
    return this.orderService.findAll();
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Указывает, где сохранять файлы
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = `${process.env.SERVER_URL}/uploads/${file.filename}`;
    return { fileUrl };
  }
}
