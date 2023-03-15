import { Injectable } from '@nestjs/common';
import { Match, Team, TeamMatchScore } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';1
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {

  constructor(
    @InjectRepository(Match) private readonly repository: Repository<Match>) { }

  async findOne(id: number): Promise<Match> {
    return this.repository.findOne({
      where: { id },
      relations: {
        teamScores: true
      }
    })
  }

}
