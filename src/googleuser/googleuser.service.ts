import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class GoogleuserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async googlelogin({
    email,
    name,
    surname,
    image,
  }: {
    email: string;
    name: string;
    surname: string;
    image: string;
  }): Promise<any> {
    const userExists = await this.userModel.findOne({
      email: email,
    });
    if (!userExists) {
      const createdUser = new this.userModel({
        email,
        name,
        surname,
        image,
      });
      await createdUser.save();
      return createdUser;
    } else {
      return userExists;
    }
  }
}
