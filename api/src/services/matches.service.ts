import { Injectable } from '@nestjs/common';
import { Match, Team, TeamMatchScore } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';1
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {

  constructor(
    @InjectRepository(Match) private readonly repository: Repository<Match>) { }

  async find(modalityId: number = undefined, finished: boolean = undefined): Promise<Match[]> {
    let where = { }

    if (modalityId) {
      where['stage'] = { modalityId }
    }

    if (finished !== undefined) {
      where['finished'] = finished
    }

    return this.repository.find({
      where,
      relations: {
        teamScores: true
      }
    })
  }

  async findOne(id: number): Promise<Match> {
    return this.repository.findOne({
      where: { id },
      relations: {
        teamScores: true
      }
    })
  }

}
