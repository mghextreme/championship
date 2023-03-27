import { ApiProperty } from "@nestjs/swagger";

export class TeamDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  color: string;
}
