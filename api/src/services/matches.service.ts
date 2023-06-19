import { Injectable } from '@nestjs/common';
import { Match } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private readonly repository: Repository<Match>,
  ) {}

  async find(
    modalityId: number = undefined,
    finished: boolean = undefined,
  ): Promise<Match[]> {
    const where = {};

    if (modalityId) {
      where['stage'] = { modalityId };
    }

    if (finished !== undefined) {
      where['finished'] = finished;
    }

    return this.repository.find({
      where,
      relations: {
        teamScores: {
          team: true,
        },
        stage: true,
      },
      order: {
        startDateTime: finished === true ? 'DESC' : 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Match> {
    return this.repository.findOne({
      where: { id },
      relations: {
        teamScores: {
          team: true,
        },
      },
      loadRelationIds: true,
    });
  }
}
