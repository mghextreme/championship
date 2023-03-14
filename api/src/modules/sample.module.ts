import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SampleController } from "src/controllers";
import { Sample } from "src/entities";
import { SampleService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  providers: [SampleService],
  controllers: [SampleController]
})
export class SampleModule {}
