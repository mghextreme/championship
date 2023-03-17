import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StagesController } from "src/controllers";
import { Match, Stage } from "src/entities";
import { StagesService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Stage, Match])],
  providers: [StagesService],
  controllers: [StagesController]
})
export class StagesModule {}
