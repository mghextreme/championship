import { Injectable } from '@nestjs/common';
import { QueryResultDto, SampleCreateDto, SampleUpdateDto } from 'src/models';
import { Sample } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SampleService {

  constructor(
    @InjectRepository(Sample) private readonly repository: Repository<Sample>) { }

  async findAll(): Promise<Sample[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Sample> {
    return this.repository.findOneBy({ id })
  }

  async create(createDto: SampleCreateDto): Promise<Sample> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: SampleUpdateDto): Promise<Sample> {
    const record = await this.repository.findOneBy({ id });
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

}
