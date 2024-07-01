import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ReqAnalyzeDto {
  @ApiProperty({ description: "pcm data" })
  @IsNumber({}, { each: true })
  readonly pcm: number[];
}
