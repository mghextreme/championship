import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeamMatchScore } from "./team-match-score.entity";

@Entity()
export class Team {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  color: string;

  @OneToMany(() => TeamMatchScore, (matchScore) => matchScore.team)
  matchScores: TeamMatchScore[];

}
