import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule, MatchesModule, ModalitiesModule, StagesModule, TeamsModule, UsersModule } from './modules';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [configuration],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => configService.get('database'),
      inject: [ConfigService]
    }),
    AuthModule,
    MatchesModule,
    ModalitiesModule,
    StagesModule,
    TeamsModule,
    UsersModule
  ]
})
export class AppModule {}
