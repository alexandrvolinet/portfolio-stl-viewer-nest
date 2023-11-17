import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserAuthService } from './user.service';
import { User } from './user.schema';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from './dtos/registration.dto';

@Controller('api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    return this.userAuthService.createUser(createUserDto);
  }

  @Post('login')
  async loginUser(
    @Body() body: { email: string; password: string },
  ): Promise<{ message: string; token: string }> {
    const { email, password } = body;
    const token = await this.userAuthService.loginUser(email, password);
    return { message: 'Login successful', token };
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers(): Promise<User[]> {
    return this.userAuthService.getUsers();
  }
}
