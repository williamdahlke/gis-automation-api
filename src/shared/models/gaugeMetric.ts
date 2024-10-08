import { IsInt, Max, Min } from "class-validator";
import { Metric } from "./metric";
import { ApiProperty } from "@nestjs/swagger";

export class GaugeMetric extends Metric{
    @ApiProperty({description: 'Operação: (0 - Undefined, 1 - Increment, 2 - Decrement)'})
    @IsInt()
    @Min(0)
    @Max(2)
    public Operation : number;

    constructor(Operation : number){
        super();
        this.Operation = Operation;        
    }
}