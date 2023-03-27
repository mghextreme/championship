import { Injectable } from '@nestjs/common';
import { Team } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';1
import { Repository } from 'typeorm';
import { QueryResultDto, TeamDto } from 'src/models';

@Injectable()
export class TeamsService {

  constructor(
    @InjectRepository(Team) private readonly repository: Repository<Team>) { }

  async findAll(): Promise<Team[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Team> {
    return this.repository.findOneBy({ id })
  }

  async create(createDto: TeamDto): Promise<Team> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: TeamDto): Promise<Team> {
    const record = await this.repository.findOneBy({ id });
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

}
