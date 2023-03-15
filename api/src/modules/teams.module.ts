import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamsController } from "src/controllers";
import { Team } from "src/entities";
import { TeamsService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamsService],
  controllers: [TeamsController]
})
export class TeamsModule {}
