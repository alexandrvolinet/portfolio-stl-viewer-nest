import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './contactmessage.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async processContactForm(formData: any): Promise<void> {
    const newMessage = new this.messageModel(formData);
    await newMessage.save();
  }
}
