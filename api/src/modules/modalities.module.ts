import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModalitiesController } from "src/controllers";
import { Modality } from "src/entities";
import { ModalitiesService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Modality])],
  providers: [ModalitiesService],
  controllers: [ModalitiesController]
})
export class ModalitiesModule {}
