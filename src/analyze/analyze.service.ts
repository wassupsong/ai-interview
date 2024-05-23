import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ReqAnalyzeDto } from "./dto/request-analyze";
import { ConfigService } from "@nestjs/config";
import { map } from "rxjs";
import { AxiosResponse } from "axios";
import { ResAnalyzeDto } from "./dto/response-analyze";

@Injectable()
export class AnalyzeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendPcmData(
    body: ReqAnalyzeDto,
  ): Promise<AxiosResponse<ResAnalyzeDto>> {
    const url = this.configService.get<string>("ANALYZE_API_URL");
    console.log(body);
    console.log(url);

    const result = await this.httpService.axiosRef.post(`${url}/hj_test`, body);

    return result.data;
  }
}
