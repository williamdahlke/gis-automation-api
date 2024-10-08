import { Injectable } from '@nestjs/common';
import { GaugeMetric } from 'src/shared/models';

@Injectable()
export class AutomationService {

 addOrUpdateActiveUsersMetric(gauge: GaugeMetric) {
   //throw new Error('Method not implemented.');
 }
 addOrUpdateGauge(gauge: GaugeMetric) {
   //throw new Error('Method not implemented.');
 }
}