import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';
import { CachingModule } from './libs/caching/caching.module';
import { DatabaseModule } from './libs/database/database.module';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CachingModule,
  ],
})
export class AppModule {}
