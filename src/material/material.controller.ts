import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { AdminGuard } from '../admin/admin.guard';
import { Guard } from 'src/user/auth.guard';

@Controller('api/materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @UseGuards(Guard, AdminGuard)
  @Post()
  async addMaterial(@Body() createMaterialDto: { name: string }) {
    return this.materialService.createMaterial(createMaterialDto);
  }

  @Get('/all')
  async getAllMaterials() {
    return this.materialService.getAllMaterials();
  }

  @UseGuards(Guard, AdminGuard)
  @Delete(':id')
  async deleteMaterial(@Param('id') materialId: string) {
    return this.materialService.deleteMaterial(materialId);
  }
}
