import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/message.dto';

@Controller('api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/submit')
  async submitContactForm(@Body() createMessageDto: CreateMessageDto) {
    await this.messageService.processContactForm(createMessageDto);
  }
}
