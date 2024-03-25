import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ColorService } from './color.service';
import { AdminGuard } from '../admin/admin.guard';
import { Guard } from 'src/user/auth.guard';

@Controller('api/colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @UseGuards(Guard, AdminGuard)
  @Post()
  async addColor(@Body() createColorDto: { name: string }) {
    return this.colorService.createColor(createColorDto);
  }

  @Get('/all')
  async getAllColors() {
    return this.colorService.getAllColors();
  }

  @UseGuards(Guard, AdminGuard)
  @Delete(':id')
  async deleteColor(@Param('id') colorId: string) {
    return this.colorService.deleteColor(colorId);
  }
}
