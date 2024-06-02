import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsObject, IsString } from "class-validator";
import { ReqAnalyzeDto } from "./request-analyze";

interface Feedback {
  score: number;
  comment: string;
}
export class ResAnalyzeDto {
  @IsObject()
  readonly decibel_feedback: Feedback;

  @IsObject()
  readonly pitch_feedback: Feedback;
}
