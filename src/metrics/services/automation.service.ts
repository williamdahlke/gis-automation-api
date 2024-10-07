import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricService {
 getMetricsData() {
   return { message: 'Metrics data' };
 }
}