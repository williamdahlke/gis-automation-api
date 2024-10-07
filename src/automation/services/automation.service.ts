import { Injectable } from '@nestjs/common';

@Injectable()
export class AutomationService {
 getMetricsData() {
   return { message: 'Metrics data' };
 }
}