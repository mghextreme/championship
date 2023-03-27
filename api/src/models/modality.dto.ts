import { ApiProperty } from "@nestjs/swagger";

export class ModalityDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  name: string;
}
