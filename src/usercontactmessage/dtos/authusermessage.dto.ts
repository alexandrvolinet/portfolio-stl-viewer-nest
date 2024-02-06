import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMessageDto {
  email: string;
  name: string;
  surname: string;
  fullName?: string;

  @IsNotEmpty()
  @MaxLength(256)
  subject: string;

  @IsNotEmpty()
  @MaxLength(512)
  message: string;
}
