import {
  IsOptional,
  IsNotEmpty,
  IsString,
  // IsUrl,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  zCode: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsNotEmpty()
  @IsString()
  material: string;

  @IsNotEmpty()
  @IsString()
  resolution: string;

  //цвет
  //кол-во

  @IsNotEmpty()
  @IsString()
  fileName: string;

  // @IsNotEmpty()
  // @IsUrl()
  // stlFileUrl: string;
}
