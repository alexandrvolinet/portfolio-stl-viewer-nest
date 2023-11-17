import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsStrongPassword,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsEqualTo } from './isEqual';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  readonly surname: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(64)
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(32)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  readonly password: string;

  @IsNotEmpty()
  @IsEqualTo('password', {
    message: 'Password and confirmation password do not match',
  })
  readonly confirmPassword: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  agreement: boolean;
}
