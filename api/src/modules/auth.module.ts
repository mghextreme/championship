import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "src/controllers";
import { AuthService } from "src/services";
import { JwtAuthGuard, JwtStrategy, LocalStrategy } from "src/services/auth";
import { UsersModule } from "./users.module";
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from "@nestjs/core";

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async(configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: { expiresIn: '60s' },
        }
      },
      inject: [ConfigService]
    })],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ]
})
export class AuthModule {}
