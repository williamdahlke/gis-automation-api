import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricService } from './services/metric.service';

@Module({
 imports: [
   PrometheusModule.register({
     defaultMetrics: {
       enabled: true,
     },
   }),
 ],
 controllers: [MetricsController],
 providers: [MetricService],
})
export class MetricsModule {}