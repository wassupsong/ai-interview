import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";
import { ReqAnalyzeDto } from "./request-analyze";

class BodyType extends ReqAnalyzeDto {}

export class ResAnalyzeDto {
  @ApiProperty({ description: "pcm data" })
  @IsNumber({}, { each: true })
  readonly pcm: number[];

  @ApiProperty({ description: "create date" })
  @IsDateString()
  readonly createDate: Date;
}
