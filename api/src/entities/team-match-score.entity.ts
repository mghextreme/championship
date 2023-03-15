import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./match.entity";
import { Team } from "./team.entity";

@Entity()
export class TeamMatchScore {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Team, (team) => team.matchScores)
  team: Team;

  @ManyToOne(() => Match, (match) => match.teamScores, {nullable: false})
  match: Match;

  @Column('integer', {default: 0})
  @ApiProperty()
  score: number;

}
