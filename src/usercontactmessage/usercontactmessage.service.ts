import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../contactmessage/contactmessage.schema';

@Injectable()
export class UserContactMessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async processContactForm(formData: any): Promise<void> {
    const newMessage = new this.messageModel(formData);
    await newMessage.save();
  }
}
