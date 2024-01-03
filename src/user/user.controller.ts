import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { UserAuthService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { Guard } from './auth.guard';
import { CreateUserDto } from './dtos/registration.dto';
import { Request } from '@nestjs/common';
import { SafeUser } from './user.schema';

@Controller('api/auth')
export class UserAuthController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly jwtService: JwtService,
  ) {}

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
    return this.userAuthService.loginUser(email, password);
  }

  @Get('logout')
  @UseGuards(Guard)
  logout(@Res() res: Response) {
    res.clearCookie('Authorization');
    res.send({ message: 'Logout successful' });
  }

  @Get('users')
  @UseGuards(Guard)
  async getUsers(): Promise<User[]> {
    return this.userAuthService.getUsers();
  }

  @Get('me')
  @UseGuards(Guard)
  async getMe(@Request() req): Promise<SafeUser> {
    return this.userAuthService.getUserById(req.user.userId);
  }

  @Post('google-login')
  async googleAuth(@Body() googleUserDto: any) {
    return this.userAuthService.googleLogin(googleUserDto);
  }

  @Put('updateUser')
  @UseGuards(Guard)
  async updateUser(
    @Request() req,
    @Body('agreement') agreement: boolean,
  ): Promise<SafeUser> {
    return this.userAuthService.updateUser(req.user.userId, { agreement });
  }
}
