import { Controller, Get } from "@nestjs/common";

@Controller("")
export class AppController {
  @Get("")
  readMe() {
    return "안녕 ai-interview api 란다";
  }
}
