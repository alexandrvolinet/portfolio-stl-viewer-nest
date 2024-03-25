import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zCode: string;

  @Prop({ required: true })
  street: string;

  @Prop()
  companyName?: string;

  @Prop()
  comment?: string;

  @Prop({ required: true })
  material: string;

  @Prop({ required: true })
  resolution: string;

  @Prop({ required: true })
  fileName: string;

  @Prop()
  color: string;

  @Prop()
  quantity: number;

  // @Prop({ required: true })
  // stlFileUrl: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
