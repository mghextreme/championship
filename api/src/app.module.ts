import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MatchesModule, SampleModule, StagesModule, TeamsModule } from './modules';
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
    MatchesModule,
    SampleModule,
    StagesModule,
    TeamsModule
  ]
})
export class AppModule {}
