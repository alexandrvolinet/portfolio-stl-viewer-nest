import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  admin: boolean;

  @Prop({ required: true, default: false })
  agreement: boolean;

  //change to false
  @Prop({ default: true })
  active: boolean;

  @Prop()
  emailConfirmationToken: string;

  @Prop()
  emailConfirmationExpires: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
