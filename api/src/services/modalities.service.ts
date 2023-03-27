import { Injectable } from '@nestjs/common';
import { Modality } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModalityDto, QueryResultDto } from 'src/models';

@Injectable()
export class ModalitiesService {

  constructor(
    @InjectRepository(Modality) private readonly repository: Repository<Modality>) { }

  async findAll(): Promise<Modality[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Modality> {
    return this.repository.findOne({
      where: { id },
      relations: {
        stages: true
      }
    })
  }

  async create(createDto: ModalityDto): Promise<Modality> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: ModalityDto): Promise<Modality> {
    const record = await this.repository.findOneBy({ id });
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

}
