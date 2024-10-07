import { IsInt, Max, Min } from "class-validator";
import { Metric } from "./metric";

export class GaugeMetric extends Metric{
    @IsInt()
    @Min(0)
    @Max(2)
    public Operation : number;

    constructor(Operation : number){
        super();
        this.Operation = Operation;        
    }
}