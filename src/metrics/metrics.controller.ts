import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MetricService } from './services/metric.service';

@ApiTags('automation')
@Controller('automation')
export class MetricsController {
 constructor(private readonly service: MetricService) {}

 @Get()
 public async getMetrics() {
   return this.service.getMetricsData();
 }
}