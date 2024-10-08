import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Gauge, Histogram } from 'prom-client';
import { GroupedUsers } from 'src/shared/interfaces';
import { GaugeMetric, Metric, WegUser } from 'src/shared/models';

@Injectable()
export class AutomationService {
  constructor(@InjectMetric('gis_usuarios_ativos_total') private readonly activeUsers: Gauge){
    this.gaugeList.push(this.activeUsers);
  }

  private histogramList : Histogram[] = [];
  private gaugeList: Gauge[] = [];
  private activeUsersArray: WegUser[] = []

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

  addOrUpdateActiveUsersMetric(metric: Metric) {
    const selectedUser = this.activeUsersArray.find((x) => x.Name == metric.User!.Name && x.Unity == metric.User!.Unity);
    if (selectedUser == undefined) this.activeUsersArray.push(metric.User!);

    this.filterActiveUsersByTime();
    let groupedUsersArray = this.groupActiveUsersByUnity();
    this.setActiveUsersMetricValue(groupedUsersArray);
  }

  private filterActiveUsersByTime() {
    let filtroData = new Date();
    filtroData.setDate(filtroData.getDate() - 90);
    this.activeUsersArray = this.activeUsersArray.filter((x) => x.LastOpened >= filtroData.getTime());
  }

  private groupActiveUsersByUnity() {
    let groupedUsers: GroupedUsers = this.groupByUnity(this.activeUsersArray);
    let groupedUsersArray = Object.values(groupedUsers);

    return groupedUsersArray;
  }

  private groupByUnity(users: WegUser[]): GroupedUsers {
    return users.reduce((groups: GroupedUsers, user: WegUser) => {
      const unity = user.Unity;
      if (!groups[unity]) {
        groups[unity] = { unity: unity, totalUsers: 0 };
      }
      groups[unity].totalUsers++;
      return groups;
    }, {});
  }

  private setActiveUsersMetricValue(groupedUsersArray: { unity: string; totalUsers: number }[]) {
    this.activeUsers.reset();
    groupedUsersArray.forEach((item) => {this.activeUsers.labels(item.unity).inc(item.totalUsers)});
  }
}
