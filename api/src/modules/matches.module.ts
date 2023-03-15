import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchesController } from "src/controllers";
import { Match, Team, TeamMatchScore } from "src/entities";
import { MatchesService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Match, Team, TeamMatchScore])],
  providers: [MatchesService],
  controllers: [MatchesController]
})
export class MatchesModule {}
