import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AutomationService } from './services/automation.service';
import { GaugeMetric, HistogramMetric } from 'src/shared/models';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@ApiBearerAuth()
@ApiTags('automation')
@Controller('automation')
export class AutomationController {
  constructor(private readonly service: AutomationService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gauge metric created or updated',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @Post('/metrics/gauge')
  public async insertGauge(@Body() gauge: GaugeMetric) {
    const gaugeInstance = plainToInstance(GaugeMetric, gauge);

    validate(gaugeInstance).then((errors) => {
      if (errors.length > 0) {
        throw new Error('The request has some erros, such as: ' + errors);
      }
    });

    this.service.addOrUpdateGauge(gaugeInstance);
    this.service.addOrUpdateActiveUsersMetric(gaugeInstance);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Histogram metric created or updated',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @Post('/metrics/histogram')
  public async insertHistogram(@Body() histogram: HistogramMetric) {
    const histogramInstance = plainToInstance(HistogramMetric, histogram);

    validate(histogramInstance).then((errors) => {
      if (errors.length > 0) {
        throw new Error('The request has some erros, such as: ' + errors);
      }
    });

    this.service.addOrUpdateHistogram(histogramInstance);
    this.service.addOrUpdateActiveUsersMetric(histogramInstance);    
  }
}
