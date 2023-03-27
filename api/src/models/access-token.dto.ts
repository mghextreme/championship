import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenDto {
  @ApiProperty({ required: true })
  access_token: string;
}
