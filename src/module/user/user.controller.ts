import { Controller, Get, Param } from '@nestjs/common/decorators';
import { UseGuards, Query, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/role/role.guard';
import { Roles } from '../auth/decorator/role.decorator';
import { ROLEID } from '../../common/enum';
import { FindOptionsOrderPipe } from '../../common/dto/validation.pipe';
import { FindOptionsOder } from '../../common/dto/find.dto';
import { User } from '../auth/decorator/user.decorator';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { ERROR_MESSAGE } from '../../common/error-message';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import {
  FindAllUserResponseDto,
  FindOneUserResponseDto,
  UpdateUserDto,
} from './dto/user.dto';
import { ResponseSuccessDto } from '../../common/dto/response.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: FindAllUserResponseDto })
  @Roles(ROLEID.ADMIN)
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @ApiQuery({ name: 'sort', required: false })
  async findAllUser(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('keyword') keyword: string,
    @Query('sort', FindOptionsOrderPipe) sort?: FindOptionsOder,
  ) {
    return await this.userService.findAllUser(
      {
        page: Number(page || 1),
        limit: Number(limit || 10),
        keyword: keyword,
        roleId: ROLEID.USER,
        active: true,
        sort: sort || { id: 'DESC' },
      },
      { address: true, firstName: true, lastName: true, id: true, email: true },
    );
  }

  @ApiOkResponse({ type: FindOneUserResponseDto })
  @Get(':userId')
  async findOneUser(@User() userRequest, @Param('userId') userId: number) {
    if (
      userRequest.roleId === ROLEID.USER &&
      userRequest.userId !== Number(userId)
    ) {
      throw new ForbiddenException(ERROR_MESSAGE.FOR_BIDEN_RESOURCE);
    }
    return await this.userService.findOneUser(
      { id: userId, isActive: true },
      { address: true, firstName: true, lastName: true, id: true, email: true },
    );
  }

  @ApiOkResponse({ type: ResponseSuccessDto })
  @Put(':userId')
  async editProfile(
    @User() userRequest,
    @Param('userId') userId: number,
    @Body() data: UpdateUserDto,
  ) {
    if (
      userRequest.roleId === ROLEID.USER &&
      userRequest.userId !== Number(userId)
    ) {
      throw new ForbiddenException(ERROR_MESSAGE.FOR_BIDEN_RESOURCE);
    }

    await this.userService.editUser(
      { id: userId },
      { ...data, roleId: ROLEID.USER, isActive: true },
    );
    return {
      success: true,
    };
  }

  @ApiOkResponse({ type: ResponseSuccessDto })
  @Roles(ROLEID.ADMIN)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number) {
    await this.userService.editUser({ id: userId }, { isActive: false });
    return {
      success: true,
    };
  }
}
