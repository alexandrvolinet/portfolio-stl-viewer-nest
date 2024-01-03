import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface SafeUser {
  name: string;
  surname: string;
  email: string;
  admin: boolean;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  surname: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  admin: boolean;

  @Prop({ default: false })
  agreement: boolean;

  //change to false
  @Prop({ default: true })
  active: boolean;

  @Prop({ unique: true, sparse: true })
  googleId: string;

  @Prop()
  telnumber: string;

  @Prop()
  adress: string;

  @Prop()
  firm: string;

  @Prop()
  threedobjname: string;

  @Prop()
  emailConfirmationToken: string;

  @Prop()
  emailConfirmationExpires: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
