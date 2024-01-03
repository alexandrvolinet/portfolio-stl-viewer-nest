import { Body, Controller, Post } from '@nestjs/common';
import { GoogleuserService } from './googleuser.service';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller()
export class GoogleuserController {
  constructor(
    private readonly appService: GoogleuserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/googlelogin')
  async googlelogin(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const user = await this.appService.googlelogin({
      email: payload.email,
      name: payload.given_name,
      surname: payload.family_name,
      image: payload.picture,
    });

    const jwtToken = this.jwtService.sign({ userId: user._id });
    return { ...payload, token: jwtToken, agreement: user.agreement };
  }
}
