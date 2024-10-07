import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInicializingMessage(): string {
    return "Application is running on port: ";
  }
}
