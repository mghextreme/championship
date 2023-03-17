import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./match.entity";
import { Modality } from "./modality.entity";

export enum StageType {
  RoundRobin = "round-robin",
  SingleBracket = "single-bracket"
}

@Entity()
export class Stage {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({
    type: "enum",
    enum: StageType,
    default: StageType.SingleBracket
  })
  @ApiProperty({ enum: StageType })
  type: StageType;

  @OneToMany(() => Match, (match) => match.stage)
  matches: Match[];

  @ManyToOne(() => Modality, (modality) => modality.stages, {nullable: false})
  @JoinColumn({ name: 'modalityId' })
  modality: Modality;

  @Column()
  modalityId: number;

}
