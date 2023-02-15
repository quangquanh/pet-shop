import { UseGuards } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common/decorators';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger/dist/decorators';
import { ResponseSuccessDto } from '../../common/dto/response.dto';
import { AuthService } from './auth.service';
import { User } from './decorator/user.decorator';
import {
  LoginDto,
  LoginResponseDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
  RegisterDto,
  TokenVerificationDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: LoginResponseDto })
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @ApiOkResponse({ type: LoginResponseDto })
  @Post('google-login')
  async googleLogin(@Body() data: TokenVerificationDto) {
    return await this.authService.loginGoogle(data.token);
  }

  @ApiOkResponse({ type: ResponseSuccessDto })
  @Post('register')
  async register(@Body() data: RegisterDto) {
    await this.authService.register(data);
    return {
      success: true,
    };
  }

  @ApiOkResponse({ type: ResponseSuccessDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  async logOut(@User() userRequest) {
    await this.authService.logout({ ...userRequest });
  }

  @ApiOkResponse({ type: RefreshTokenResponseDto })
  @Post('refreshToken')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return await this.authService.refreshToken(data);
  }
}
