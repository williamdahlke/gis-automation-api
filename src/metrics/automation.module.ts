import { Module } from '@nestjs/common';
import { AutomationController } from './automation.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricService as AutomationService } from './services/automation.service';

@Module({
 imports: [
   PrometheusModule.register({
     defaultMetrics: {
       enabled: true,
     },
   }),
 ],
 controllers: [AutomationController],
 providers: [AutomationService],
})
export class MetricsModule {}