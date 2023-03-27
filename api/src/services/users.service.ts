import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>) { }

  async findOne(username: string): Promise<User> {
    return this.repository.findOneBy({ username });
  }

}
