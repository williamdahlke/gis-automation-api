import { Module } from '@nestjs/common';
import { AutomationController } from './automation.controller';
import { makeCounterProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AutomationService as AutomationService } from './services/automation.service';

@Module({
 imports: [
   PrometheusModule.register({
     defaultMetrics: {
       enabled: true,
     },
   }),
 ],
 controllers: [AutomationController],
 providers: [AutomationService,
             makeCounterProvider({
              name: 'gis_usuarios_ativos_total',
              help: 'Número de usuários ativos nos últimos 3 meses',
              labelNames: ['unity']
             })
 ],

})
export class MetricsModule {}