import {
  Body,
  Controller,
  Get,
  Logger,
  MessageEvent,
  ParseArrayPipe,
  Post,
  Req,
  Sse,
  UseGuards,
} from "@nestjs/common";
import { ReqAnalyzeDto } from "./dto/request-analyze.dto";
import { AnalyzeService } from "./analyze.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResAnalyzeDto } from "./dto/response-analyze.dto";
import { Observable, Subject } from "rxjs";
import { AuthGuard } from "@nestjs/passport";

@Controller("analyze")
@UseGuards(AuthGuard())
@ApiTags("분석 서버 연결 api")
export class AnalyzeController {
  private logger = new Logger("Controller-Analyze");
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
  async postData(@Body("pcm", ParseArrayPipe) pcm: ReqAnalyzeDto) {
    this.logger.debug(`postData pcm: ${JSON.stringify(pcm)}`);
    return this.analyzeService.sendPcmData(pcm);
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
    console.log("receiveData: ", body);
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

  @Get("username")
  async getUserName(@Req() req) {
    this.logger.debug("username 조회");
    return this.analyzeService.getUserName(req.user.userId);
  }
}
