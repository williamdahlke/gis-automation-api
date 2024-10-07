import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpAdapterHost } from '@nestjs/core';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly adapterHost: HttpAdapterHost) {}

    @Get('/')
    getHome(): string {
      const server = this.adapterHost.httpAdapter.getHttpServer();
      const address = server.address();
      return this.appService.getInicializingMessage() + address.port;
  }
}
