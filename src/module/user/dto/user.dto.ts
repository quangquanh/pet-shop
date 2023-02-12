import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginateDto } from '../../../common/dto/response.dto';

export class UpdateUserDto {
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
}

export class FindOneUserResponseDto {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty({ required: true })
  address: string;
}

export class FindAllUserResponseDto {
  @ApiProperty({ required: true, isArray: true, type: FindOneUserResponseDto })
  data: FindOneUserResponseDto[];

  @ApiProperty({ type: PaginateDto })
  paginate: PaginateDto;
}
