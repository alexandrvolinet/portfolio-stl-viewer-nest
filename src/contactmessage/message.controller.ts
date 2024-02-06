import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/guestmessage.dto';
import { AdminGuard } from '../admin/admin.guard';
import { Guard } from 'src/user/auth.guard';

@Controller('api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/submit-guest')
  async submitContactForm(@Body() createMessageDto: CreateMessageDto) {
    await this.messageService.processContactForm(createMessageDto);
  }

  @UseGuards(Guard, AdminGuard)
  @Get('/all')
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @UseGuards(Guard, AdminGuard)
  @Delete('/:id')
  async deleteMessageById(@Param('id') messageId: string) {
    await this.messageService.deleteMessageById(messageId);
  }
}
