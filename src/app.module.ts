import { GoogleuserModule } from './googleuser/googleuser.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './contactmessage/message.module';
import { UserContactMessageModule } from './usercontactmessage/usercontactmessage.module';
import { User, UserSchema } from './user/user.schema';
import { Message, MessageSchema } from './contactmessage/contactmessage.schema';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MessageModule,
    UserModule,
    AdminModule,
    GoogleuserModule,
    UserContactMessageModule,
    OrderModule,
    RouterModule.register([
      {
        path: 'admin', // prefix for admin user
        module: AdminModule,
      },
    ]),
  ],
})
export class AppModule {}
