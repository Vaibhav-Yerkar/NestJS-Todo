import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello! from TODO rest API <a href="/swagger">Click here to load Swagger Docs.</a>`;
  }
}