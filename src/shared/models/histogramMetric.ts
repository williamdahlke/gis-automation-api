import { ApiProperty } from "@nestjs/swagger";
import { Metric } from "./metric";

export class HistogramMetric extends Metric{

    @ApiProperty()
    public ElapsedTimeMs : number;

    @ApiProperty()
    public Buckets : number[];

    constructor(ElapsedTimeMs : number = 0,
                Buckets : number[]){
        super();
        this.ElapsedTimeMs = ElapsedTimeMs;
        this.Buckets = Buckets;
    }
}