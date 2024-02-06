import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { UserContactMessageService } from './usercontactmessage.service';
import { CreateMessageDto } from './dtos/authusermessage.dto';
import { Guard } from '../user/auth.guard';
import { UserAuthService } from '../user/user.service';

@Controller('api/message')
export class UserContactMessageController {
  constructor(
    private readonly messageService: UserContactMessageService,
    private readonly userAuthService: UserAuthService,
  ) {}

  @UseGuards(Guard)
  @Post('/submit-user')
  async submitUserContactForm(
    @Body() createMessageDto: CreateMessageDto,
    @Req() req,
  ) {
    const user = await this.userAuthService.getUserById(req.user.userId);

    const fullName = `${user.name} ${user.surname}`.trim();
    createMessageDto.fullName = fullName;
    createMessageDto.email = user.email;
    createMessageDto.name = user.name;
    createMessageDto.surname = user.surname;

    await this.messageService.processContactForm(createMessageDto);
  }
}
