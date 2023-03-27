import { ClassSerializerInterceptor, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/services/auth';
import { AuthService } from 'src/services';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({ type: User })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
