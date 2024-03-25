import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color } from './color.scheme';

@Injectable()
export class ColorService {
  constructor(@InjectModel(Color.name) private colorModel: Model<Color>) {}

  async createColor(createColorDto: { name: string }): Promise<Color> {
    const newColor = new this.colorModel(createColorDto);
    return newColor.save();
  }

  async getAllColors(): Promise<Color[]> {
    return this.colorModel.find().exec();
  }

  async deleteColor(colorId: string): Promise<void> {
    await this.colorModel.findByIdAndDelete(colorId);
  }
}
