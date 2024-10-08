import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Gauge, Histogram } from 'prom-client';
import { GaugeMetric, HistogramMetric, Metric, WegUser } from 'src/shared/models';
import { GroupedUsers } from 'src/shared/models/groupedUsers';

@Injectable()
export class AutomationService {
  constructor(@InjectMetric('gis_usuarios_ativos_total') private readonly activeUsers: Gauge){
    this.gaugeList.push(this.activeUsers);
  }

  private histogramList : Histogram[] = [];
  private gaugeList: Gauge[] = [];
  private groupedUsers = new GroupedUsers();

  addOrUpdateGauge(gauge: GaugeMetric) {
    if (!this.getGaugeByName(gauge.MetricName)){
      const tempGauge : Gauge = new Gauge({
        name: gauge.MetricName,
        help: gauge.Help,
        labelNames: gauge.Label!.LabelNames
      });
  
      const labels = gauge.Label.fillLabelsArray();    
  
      if (gauge.Operation === 1){
        if (labels == undefined){
          tempGauge.inc();
        } else{
          tempGauge.inc(labels, 1);
        }      
      }     
      this.gaugeList.push(tempGauge);    
    } else{    
      const result = this.getGaugeByName(gauge.MetricName);    
  
      if (result){
        const labels = gauge.Label.fillLabelsArray();
        if (gauge.Operation == 1){
          result.inc(labels, 1);
        } else{
          result.dec(labels, 1);
        }
      }    
    }      
  }

  getGaugeByName(name: string): Gauge | undefined {
    return this.gaugeList.find(gaugeItem =>
      Object.values(gaugeItem).some(value => value === name)
    );
  }  

  addOrUpdateHistogram(histogram : HistogramMetric){
    if (!this.getHistogramByName(histogram.MetricName)){
      const tempHistogram : Histogram = new Histogram({
        name: histogram.MetricName,
        help: histogram.Help,
        labelNames: histogram.Label!.LabelNames,
        buckets: histogram.Buckets
      });
  
      const labels = histogram.Label.fillLabelsArray(); 
  
      tempHistogram.observe(labels, histogram.ElapsedTimeMs);         
      this.histogramList.push(tempHistogram);    
    } else{    
      const result = this.getHistogramByName(histogram.MetricName);    
      if (result){
        const labels = histogram.Label.fillLabelsArray();
        result.observe(labels, histogram.ElapsedTimeMs);      
      }    
    }  
  }

  getHistogramByName(name: string): Histogram | undefined {
    return this.histogramList.find(histogramItem =>
      Object.values(histogramItem).some(value => value === name)
    );
  }

  addOrUpdateActiveUsersMetric(metric: Metric) {
    const selectedUser = this.groupedUsers.getUserByNameAndUnity(metric.User);        
    if (selectedUser == undefined) this.groupedUsers.setUser(metric.User);
    const groupedUsersArray = this.groupedUsers.filterAndGroupUsers();
    this.setActiveUsersMetricValue(groupedUsersArray);
  }

  private setActiveUsersMetricValue(groupedUsersArray: { unity: string; totalUsers: number }[]) {
    this.activeUsers.reset();
    groupedUsersArray.forEach((item) => {this.activeUsers.labels(item.unity).inc(item.totalUsers)});
  }
}
