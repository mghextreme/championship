import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services';
import { AccessTokenDto, LoginDto } from 'src/models';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ type: AccessTokenDto })
  async login(@Body() login: LoginDto): Promise<AccessTokenDto> {
    return this.authService.login(login.username, login.password);
  }

}
