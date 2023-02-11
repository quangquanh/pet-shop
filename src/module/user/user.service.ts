import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FindOptionsWhere, DeepPartial } from 'typeorm';
import { User } from 'src/libs/database/entity/user.entity';
import { RegisterDto } from '../auth/dto/auth.dto';
import { FindAllUserDto } from './dto/find-user.dto';
import { likeField } from 'src/common/find-operation';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ERROR_MESSAGE } from 'src/common/error-message';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async findOneUser(
    where: FindOptionsWhere<User>,
    select: FindOptionsSelect<User>,
    checkExist = true,
  ) {
    const user = await this.userRepository.findOne({ where, select });
    if (!user && checkExist) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    return user;
  }

  async createUser(data: RegisterDto) {
    await this.userRepository.save(data);
  }

  async findAllUser(option: FindAllUserDto, select: FindOptionsSelect<User>) {
    const { keyword, limit, page, roleId, sort, active } = option;
    const commonAndConditions = { roleId, isActive: active };
    const skip = (page - 1) * limit;
    const [data, total] = await this.userRepository.findAndCount({
      select,
      where: [
        { firstName: likeField(keyword), ...commonAndConditions },
        { lastName: likeField(keyword), ...commonAndConditions },
        { address: likeField(keyword), ...commonAndConditions },
        { email: likeField(keyword), ...commonAndConditions },
      ],
      take: limit,
      skip,
      order: sort,
    });

    const totalPage = Math.ceil(total / limit);
    return {
      data,
      paginate: { pageIndex: page, totalPage },
    };
  }

  async editUser(where: FindOptionsWhere<User>, data: DeepPartial<User>) {
    await this.userRepository.update(where, data);
  }
}
