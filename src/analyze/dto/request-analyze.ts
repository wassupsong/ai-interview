import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class ReqAnalyzeDto {
  @ApiProperty({ description: "pcm data" })
  @IsNumber({}, { each: true })
  readonly pcm: number[];

  @ApiProperty({ description: "create date" })
  @IsDateString()
  readonly createDate: Date;
}
