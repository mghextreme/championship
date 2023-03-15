import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeamMatchScore } from "./team-match-score.entity";

@Entity()
export class Match {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({default: true})
  @ApiProperty()
  finished: boolean;

  @Column({default: null})
  @ApiProperty()
  startDateTime: Date;

  @OneToMany(() => TeamMatchScore, (teamScore) => teamScore.match)
  teamScores: TeamMatchScore[];

}
