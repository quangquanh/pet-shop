import { Injectable, Logger } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { google, Auth } from 'googleapis';

import { ROLEID } from '../../common/enum';
import { ERROR_MESSAGE } from '../../common/error-message';
import { randomCode } from '../../common/function';
import configuration from '../../configuration/configuration';
import { CachingService } from '../../libs/caching/caching.service';
import { UserService } from '../user/user.service';
import {
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  TokenPayload,
} from './dto/auth.dto';
@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cachingService: CachingService,
  ) {
    const clientId = configuration().google.google_client_id;
    const clientSecret = configuration().google.google_secret;
    this.oauthClient = new google.auth.OAuth2({ clientId, clientSecret });
  }

  async login(data: LoginDto) {
    const { email } = data;
    const user = await this.userService.findOneUser({ email }, {}, false);
    const { id, roleId, password, isActive, ...userRest } = user;

    if (!user || (!compare(data.password, password) && isActive)) {
      throw new BadRequestException(ERROR_MESSAGE.EMAIL_OR_PASSWORD_INCORRECT);
    }

    const sessionId = randomCode(6);
    const payload: TokenPayload = { id, email, roleId, sessionId };
    const { accessToken, refreshToken } = this.signToken(
      payload,
      sessionId.toString(),
    );

    return {
      type: 'Bearer',
      user: { id, ...userRest },
      accessToken,
      refreshToken,
    };
  }

  async loginGoogle(token: string) {
    try {
      const tokenInfo = await this.oauthClient.getTokenInfo(token);
      const email = tokenInfo.email;
      const user = await this.userService.findOneUser({ email }, {}, false);
      const sessionId = randomCode(6);

      if (!user) {
        throw new BadRequestException(
          ERROR_MESSAGE.EMAIL_OR_PASSWORD_INCORRECT,
        );
      }
      const { id, roleId, password, isActive, ...userRest } = user;
      const payload: TokenPayload = { id, email, roleId, sessionId };
      const { accessToken, refreshToken } = this.signToken(
        payload,
        sessionId.toString(),
      );

      return {
        type: 'Bearer',
        user: { id, ...userRest },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(ERROR_MESSAGE.ACCESS_TOKEN_INVALID);
    }
  }

  async register(data: RegisterDto) {
    const user = this.userService.findOneUser({ email: data.email }, {}, false);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.USER_IS_EXISTED);
    }

    data.roleId = ROLEID.USER;
    data.isActive = true;
    await this.userService.createUser(data);
  }

  async refreshToken(data: RefreshTokenDto) {
    const payload = await this.jwtService.verify(data.refreshToken);
    const refreshToken = await this.cachingService.get(
      payload.sessionId.toString(),
    );
    if (!payload || refreshToken !== data.refreshToken) {
      throw new BadRequestException(ERROR_MESSAGE.REFRESH_TOKEN_INCORRECT);
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: configuration().jwtAuth.access_token_ttl,
    });

    return {
      accessToken,
    };
  }

  async logout(data: TokenPayload) {
    this.cachingService.del(data.sessionId.toString());
  }

  signToken(payload: TokenPayload, sessionId: string) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: configuration().jwtAuth.access_token_ttl,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: configuration().jwtAuth.refresh_token_ttl,
    });
    this.cachingService.setTtl(
      sessionId,
      refreshToken,
      Number(configuration().redis.ttl),
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
