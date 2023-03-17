import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./match.entity";
import { Team } from "./team.entity";

@Entity()
export class TeamMatchScore {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Team, (team) => team.matchScores)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @ManyToOne(() => Match, (match) => match.teamScores, {nullable: false})
  @JoinColumn({ name: 'matchId' })
  match: Match;

  @Column({nullable: true})
  teamId: number

  @Column({nullable: false})
  matchId: number

  @Column('integer', {nullable: true})
  @ApiProperty()
  score: number;

}
