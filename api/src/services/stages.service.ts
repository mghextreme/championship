import { Injectable } from '@nestjs/common';
import { Match, Stage } from 'src/entities';
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
    const stagePromise = this.repository.findOneBy({ id })
    const rootMatchPromise = this.matchTreeRepository.findOne({
      where: {
        stageId: id,
        nextMatchId: null
      }
    })

    const stage = await stagePromise

    if (!stage) {
      return null
    }

    let item = new SingleBracketStageViewModel()
    item.id = stage.id
    item.name = stage.name

    const rootMatch = await rootMatchPromise
    if (rootMatch) {
      item.root = await this.matchTreeRepository.findDescendantsTree(rootMatch)
    }

    return item
  }

}
