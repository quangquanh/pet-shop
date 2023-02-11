import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const database: any = config.get<string>('database');
        return Object.assign(database.mysql, {
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/migrations/*.js'],
        });
      },
    }),
  ],
})
export class DatabaseModule {}
