import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AutomationService } from './services/automation.service';
import { GaugeMetric, HistogramMetric } from 'src/shared/models';
import { validate } from 'class-validator';

@ApiBearerAuth()
@ApiTags('automation')
@Controller('automation')
export class AutomationController {
 constructor(private readonly service: AutomationService) {}

  @Post('/metrics/gauge')
  public async insertGauge(@Body() gauge : GaugeMetric){
    console.log(gauge);
    validate(gauge).then(errors => {
    console.log(errors);
    if (errors.length > 0) {
      throw new Error("A requisição possui alguns erros, sendo: " + errors)
    }});
    
    this.service.addOrUpdateGauge(gauge);
    this.service.addOrUpdateActiveUsersMetric(gauge);
  }

  @Post('/metrics/histogram')
  public async insertHistogram(@Body() histogram : HistogramMetric){

  }
}