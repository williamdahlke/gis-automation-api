import { Metric } from "./metric";

export class GaugeMetric extends Metric{
    constructor(public Operation : number){
        super();        
    }
}