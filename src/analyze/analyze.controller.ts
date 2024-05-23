import { Body, Controller, Get, Post } from "@nestjs/common";
import { ReqAnalyzeDto } from "./dto/request-analyze";
import { AnalyzeService } from "./analyze.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Test } from "./dto/test";

@Controller("analyze")
@ApiTags("분석 서버 연결 api")
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @Post("")
  @ApiOperation({
    summary: "음성 데이터 분석 api(app to server)",
    description: "분석 서버로 pcm 데이터 전달",
  })
  async postData(@Body() body: ReqAnalyzeDto) {
    return this.analyzeService.sendPcmData(body);
  }

  @Post("test")
  async test(@Body() body: Test) {
    console.log(body.data);
    if (body.data) {
      return true;
    }
    return false;
  }

  @Get("getTest")
  getTest() {
    console.log("getTest success");
    return "재환이형 ? 들린다면 카톡해";
  }
}
