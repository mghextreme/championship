import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
