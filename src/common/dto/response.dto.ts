import { ApiProperty } from '@nestjs/swagger';

export class ResponseSuccessDto {
  @ApiProperty({ required: true })
  success: boolean;
}

export class PaginateDto {
  @ApiProperty({ required: true })
  pageIndex: number;

  @ApiProperty({ required: true })
  totalPage: number;
}
