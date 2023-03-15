import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { Stage } from "./stage.entity";
import { TeamMatchScore } from "./team-match-score.entity";

@Entity()
@Tree("closure-table", {
  closureTableName: "bracket_matches_closure"
})
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

  @Column({default: null})
  @ApiProperty()
  round: number

  @OneToMany(() => TeamMatchScore, (teamScore) => teamScore.match)
  teamScores: TeamMatchScore[];

  @ManyToOne(() => Stage, (stage) => stage.matches, {nullable: false})
  @JoinColumn({ name: 'stageId' })
  stage: Stage

  @Column()
  stageId: number;

  @TreeChildren()
  precedingMatches: Match[];

  @TreeParent()
  @JoinColumn({ name: 'nextMatchId' })
  nextMatch: Match;

  @Column({ nullable: true })
  nextMatchId: number;

}
