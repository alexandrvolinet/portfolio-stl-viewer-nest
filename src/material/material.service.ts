import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Material } from './material.scheme';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<Material>,
  ) {}

  async createMaterial(createMaterialDto: { name: string }): Promise<Material> {
    const newMaterial = new this.materialModel(createMaterialDto);
    return newMaterial.save();
  }

  async getAllMaterials(): Promise<Material[]> {
    return this.materialModel.find().exec();
  }

  async deleteMaterial(materialId: string): Promise<void> {
    await this.materialModel.findByIdAndDelete(materialId);
  }
}
