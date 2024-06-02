import { HttpService } from "@nestjs/axios";
import {
  HttpException,
  HttpStatus,
  Injectable,
  MessageEvent,
} from "@nestjs/common";
import { ReqAnalyzeDto } from "./dto/request-analyze";
import { ConfigService } from "@nestjs/config";
import { AxiosResponse } from "axios";
import { ResAnalyzeDto } from "./dto/response-analyze";

@Injectable()
export class AnalyzeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendPcmData(body: ReqAnalyzeDto): Promise<AxiosResponse<boolean>> {
    try {
      const url = this.configService.get<string>("ANALYZE_API_URL");
      const result = await this.httpService.axiosRef.post(
        `${url}/hj_test`,
        body,
      );

      if (result.data) {
        return result.data;
      } else {
        throw new HttpException("failed to send pcm data", 1000);
      }
    } catch (error) {
      // console.log(error);
      throw new HttpException(
        "Flask Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  receiveData(body: ResAnalyzeDto): MessageEvent {
    console.log("분석 자료 sse 전달");
    return {
      data: body,
    };
  }
}
