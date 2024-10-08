import { ApiProperty } from "@nestjs/swagger";

export class Label{
    
    @ApiProperty()
    public LabelNames : string[];

    @ApiProperty()    
    public LabelValues : string[];

    constructor(LabelNames : string[] = [],
                LabelValues : string[] = []){
        this.LabelNames = LabelNames;
        this.LabelValues = LabelValues;            
    }
}