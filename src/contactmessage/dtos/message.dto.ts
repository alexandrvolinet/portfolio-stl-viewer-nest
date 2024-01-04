import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @MaxLength(64)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(64)
  readonly email: string;
}
