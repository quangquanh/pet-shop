import { FindAllDto } from 'src/common/dto/find.dto';

export interface FindAllUserDto extends FindAllDto {
  roleId?: number;
  active?: boolean;
}
