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
import { SafeUser } from './user.schema';

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

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async googleLogin(googleUser: any) {
    const { googleId, email, firstName, lastName, agreement } = googleUser;

    let user = await this.userModel.findOne({ googleId });

    if (!user) {
      user = await this.userModel.findOne({ email });

      if (!user) {
        user = new this.userModel({
          name: firstName,
          surname: lastName,
          email,
          googleId,
          agreement,
        });
        await user.save();
      } else {
        // User exists with the same email but not linked to Google
        user.googleId = googleId;
        await user.save();
      }
    }

    // Generate a JWT token or handle session here as per your auth logic
    const payload = { userId: user._id, admin: user.admin };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async loginUser(
    email: string,
    password: string,
  ): Promise<{ message: string; token: string }> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid login credentials');
      }

      const payload = { userId: user._id, admin: user.admin };
      const token = this.jwtService.sign(payload);

      return { message: 'Login successful', token };
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

  async getUserById(userId: string): Promise<SafeUser> {
    const user = await this.userModel
      .findById(userId)
      .select('name surname email');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user as SafeUser;
  }

  async updateUser(
    userId: string,
    updateData: Partial<User>,
  ): Promise<SafeUser> {
    const user = await this.userModel
      .findByIdAndUpdate(userId, updateData, { new: true })
      .select('name surname email agreement');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user as SafeUser;
  }
}
