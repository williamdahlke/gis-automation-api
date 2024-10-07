import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MetricService } from './services/automation.service';

@ApiBearerAuth()
@ApiTags('automation')
@Controller('automation')
export class AutomationController {
 constructor(private readonly service: MetricService) {}

 @Get()
 public async getMetrics() {
   return this.service.getMetricsData();
 }
}