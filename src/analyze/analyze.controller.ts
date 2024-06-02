import { Body, Controller, Get, MessageEvent, Post, Sse } from "@nestjs/common";
import { ReqAnalyzeDto } from "./dto/request-analyze";
import { AnalyzeService } from "./analyze.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Test } from "./dto/test";
import { ResAnalyzeDto } from "./dto/response-analyze";
import { Observable, Subject, interval, map } from "rxjs";

@Controller("analyze")
@ApiTags("분석 서버 연결 api")
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}
  private sseSubject: Subject<MessageEvent> = new Subject();

  @Post("")
  @ApiOperation({
    summary: "음성 데이터 분석 api(app to server)",
    description: "분석 서버로 pcm 데이터 전달",
  })
  @ApiResponse({
    status: 201,
    description: "success",
    type: ResAnalyzeDto,
  })
  async postData(@Body() body: ReqAnalyzeDto) {
    return this.analyzeService.sendPcmData(body);
  }

  @Post("result")
  @ApiOperation({
    summary: "분석된 데이터 전달",
    description: "분석 데이터 앱으로 푸시",
  })
  @ApiResponse({
    status: 201,
    description: "success",
  })
  async receiveData(@Body() body: ResAnalyzeDto) {
    console.log("분석 자료 확인");
    console.log(this.sseSubject);
    if (this.sseSubject.closed) {
      console.log("SSE 닫혀있음");
    }
    this.sseSubject.next(this.analyzeService.receiveData(body));
    return true;
  }

  @Sse("sse")
  @ApiOperation({
    summary: "클라이언트 sse 연결",
  })
  sse(): Observable<MessageEvent> {
    console.log("클라이언트 연결 시도");
    return this.sseSubject.asObservable();
  }

  @Post("test")
  async test(@Body() body: Test) {
    console.log(body.data);
    if (body.data) {
      return true;
    }
    return false;
  }
}
