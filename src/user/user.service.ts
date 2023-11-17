import { Model } from 'mongoose';
import { User } from './user.schema';
import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/registration.dto';

@Injectable()
export class UserAuthService {
  private readonly logger = new Logger(UserAuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { name, surname, email, password, agreement } = createUserDto;
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    if (!agreement) {
      throw new Error('For registration you should agree terms of use');
    }

    const hash = await bcrypt.hash(password, 10);
    await this.userModel.create({
      name,
      surname,
      email,
      password: hash,
      agreement,
    });

    return {
      message:
        'User created successfully. Please check your email for confirmation.',
    };
  }

  async loginUser(email: string, password: string): Promise<string> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid login credentials');
      }
      const payload = { userId: user._id };
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('An error occurred while logging in');
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find({});
      return users;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving users');
    }
  }
}
