import { Injectable } from '@nestjs/common';
import { Match, Stage, StageType } from 'src/entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, TreeRepository } from 'typeorm';
import { SingleBracketStageViewModel } from 'src/models';

@Injectable()
export class StagesService {

  private readonly matchTreeRepository: TreeRepository<Match>

  constructor(
    @InjectEntityManager() entityManager: EntityManager,
    @InjectRepository(Stage) private readonly repository: Repository<Stage>) {
      this.matchTreeRepository = entityManager.getTreeRepository(Match)
    }

  async findOne(id: number): Promise<SingleBracketStageViewModel> {
    const stage = await this.repository.findOneBy({ id })

    switch (stage.type) {
      case StageType.SingleBracket:
        return this.get_single_bracket_stage(stage)
    }

    return null
  }

  async get_single_bracket_stage(stage: Stage): Promise<SingleBracketStageViewModel> {
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

    const rootMatch = await rootMatchPromise
    if (rootMatch) {
      item.root = await this.matchTreeRepository.findDescendantsTree(
        rootMatch,
        { relations: ['teamScores', 'teamScores.team'] }
      )
    }

    return item
  }

}
