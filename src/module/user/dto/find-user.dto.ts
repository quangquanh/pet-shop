import { FindAllDto } from '../../../common/dto/find.dto';

export interface FindAllUserDto extends FindAllDto {
  roleId?: number;
  active?: boolean;
}
