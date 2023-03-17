import { Injectable } from '@nestjs/common';
import { Modality } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

}
