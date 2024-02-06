import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(64)
  email: string;

  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsNotEmpty()
  @MaxLength(256)
  subject: string;

  @IsNotEmpty()
  @MaxLength(512)
  message: string;
}
