import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import configuration from '../../../configuration/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().jwtAuth.jwt_token_secret,
    });
  }

  async validate(payload: any) {
    const { email, roleId, sessionId, id } = payload;
    return { userId: id, email, roleId, sessionId };
  }
}
