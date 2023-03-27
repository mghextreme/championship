import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { Match, Stage, StageType } from 'src/entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, EntityNotFoundError, Repository, TreeRepository } from 'typeorm';
import { QueryResultDto, RoundRobinStageViewModel, SingleBracketStageViewModel, StageCreateDto, StageUpdateDto, StandingsRowViewModel } from 'src/models';

@Injectable()
export class StagesService {

  private readonly matchTreeRepository: TreeRepository<Match>

  constructor(
    @InjectEntityManager() entityManager: EntityManager,
    @InjectRepository(Stage) private readonly repository: Repository<Stage>,
    @InjectRepository(Match) private readonly matchesRepository: Repository<Match>) {
      this.matchTreeRepository = entityManager.getTreeRepository(Match)
    }

  async findOne(id: number): Promise<SingleBracketStageViewModel | RoundRobinStageViewModel> {
    const stage = await this.repository.findOneBy({ id })

    if (!stage) {
      throw new EntityNotFoundError(Stage, { id })
    }

    switch (stage.type) {
      case StageType.RoundRobin:
        return this.get_round_robin_stage(stage)
      case StageType.SingleBracket:
        return this.get_single_bracket_stage(stage)
    }
  }

  async create(createDto: StageCreateDto): Promise<Stage> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: StageUpdateDto): Promise<Stage> {
    const record = await this.repository.findOneBy({ id });
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

  private async get_single_bracket_stage(stage: Stage): Promise<SingleBracketStageViewModel> {
    const rootMatchPromise = this.matchTreeRepository.findOne({
      where: {
        stageId: stage.id,
        nextMatchId: null
      },
      relations: ['teamScores', 'teamScores.team']
    })

    if (!stage) {
      return null
    }

    let item = new SingleBracketStageViewModel()
    item.id = stage.id
    item.name = stage.name
    item.type = stage.type

    const rootMatch = await rootMatchPromise
    if (rootMatch) {
      item.root = await this.matchTreeRepository.findDescendantsTree(
        rootMatch,
        { relations: ['teamScores', 'teamScores.team'] }
      )
    }

    return item
  }

  private async get_round_robin_stage(stage: Stage): Promise<RoundRobinStageViewModel> {
    const matches = await this.matchesRepository.find({
      where: {
        stageId: stage.id
      },
      relations: {
        teamScores: {
          team: true
        }
      },
      order: {
        startDateTime: {
          direction: 'asc',
          nulls: 'last'
        },
        id: {
          direction: 'desc'
        }
      }
    })

    let item = new RoundRobinStageViewModel()
    item.id = stage.id
    item.name = stage.name
    item.type = stage.type
    item.matches = matches
    item.standings = await this.get_standing_from_matches(matches)
    return item
  }

  private async get_standing_from_matches(matches: Match[]): Promise<StandingsRowViewModel[]> {
    const standings: { [key: string]: StandingsRowViewModel } = {}

    const allTeams = _.uniqBy(matches.flatMap(m => m.teamScores.flatMap(ts => ts.team)), t => t.id)
    for (let team of allTeams) {
      let newRow = new StandingsRowViewModel()
      newRow.team = team
      standings[team.id] = newRow
    }

    for (let match of matches) {
      if (match.finished) {
        for (let teamScore of match.teamScores) {
          // Ensure all teams are in the dictionaryu
          if (teamScore.teamId && !(teamScore.teamId in standings)) {
            standings[teamScore.teamId] = new StandingsRowViewModel()
          }
        }

        let orderedTeamScores = _.sortBy(match.teamScores, [(ts) => -ts.score])
        let hasWinner = orderedTeamScores[0].score > orderedTeamScores[1].score

        console.log(orderedTeamScores)

        standings[orderedTeamScores[0].teamId].scorePro += orderedTeamScores[0].score
        standings[orderedTeamScores[1].teamId].scorePro += orderedTeamScores[1].score

        standings[orderedTeamScores[0].teamId].scoreAgainst += orderedTeamScores[1].score
        standings[orderedTeamScores[1].teamId].scoreAgainst += orderedTeamScores[0].score

        if (hasWinner) {
          standings[orderedTeamScores[0].teamId].wins++
          standings[orderedTeamScores[0].teamId].points += 3
          standings[orderedTeamScores[1].teamId].losses++
        } else {
          standings[orderedTeamScores[0].teamId].ties++
          standings[orderedTeamScores[0].teamId].points++
          standings[orderedTeamScores[1].teamId].ties++
          standings[orderedTeamScores[1].teamId].points++
        }
      }
    }

    return _.sortBy(Object.values(standings), [s => -s.points, s => -s.wins, s => s.scoreAgainst - s.scorePro, s => -s.scorePro])
  }

}
