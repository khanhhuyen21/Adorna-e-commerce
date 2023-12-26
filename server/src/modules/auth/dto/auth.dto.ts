import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @Transform(({ value }) => value.toLowerCase())
  @MinLength(4, {
    message: 'Email is too short',
  })
  @MaxLength(20, {
    message: 'Email is too long',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MaxLength(30, { message: 'Full Name must < 30 Characters' })
  fullName: string;
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(20, { message: 'Password must be < 20 characters' })
  password: string;
}

export class LoginDTO {
  @Transform(({ value }) => value.toLowerCase())
  @MinLength(4, {
    message: 'Email is too short',
  })
  @MaxLength(20, {
    message: 'Email is too long',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(20, { message: 'Password must be < 20 characters' })
  password: string;
}
