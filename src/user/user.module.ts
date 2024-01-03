import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { UserAuthController } from './user.controller';
import { UserAuthService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../googleuser/google.strategy'; // Adjust the path as necessary

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    PassportModule,
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, GoogleStrategy],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Any necessary middleware configuration
  }
}
