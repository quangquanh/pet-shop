import { ApiProperty } from '@nestjs/swagger/dist';
import { IsBoolean, IsEmail, IsEnum } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
import { ROLEID } from '../../../common/enum';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ required: true })
  accessToken: string;

  @ApiProperty({ required: true })
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({ required: true })
  accessToken: string;
}

export class RegisterDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(ROLEID)
  roleId: number;
}

export class RefreshTokenDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export interface TokenPayload {
  id: number;
  email: string;
  roleId: number;
  sessionId: number;
}
