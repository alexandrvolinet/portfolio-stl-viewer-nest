import { Module } from '@nestjs/common';
import { UserContactMessageService } from './usercontactmessage.service';
import { UserContactMessageController } from './usercontactmessage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Message,
  MessageSchema,
} from '../contactmessage/contactmessage.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
    UserModule,
  ],
  controllers: [UserContactMessageController],
  providers: [UserContactMessageService],
})
export class UserContactMessageModule {}
