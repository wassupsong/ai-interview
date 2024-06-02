import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { ReqAnalyzeDto } from "./request-analyze";
import { Type } from "class-transformer";

class Feedback {
  @IsNumber()
  readonly score: number;

  @IsString()
  readonly comment: string;
}

export class ResAnalyzeDto {
  @Type(() => Feedback)
  @ValidateNested()
  readonly decibel_feedback: Feedback;

  @Type(() => Feedback)
  @ValidateNested()
  readonly pitch_feedback: Feedback;
}
