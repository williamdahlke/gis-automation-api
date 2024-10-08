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

    fillLabelsArray() {
        // Cria um objeto de labels baseado no array
        const labels = this.LabelValues.reduce((acc, valor, index) => {
          acc[this.LabelNames[index]] = valor; // label1, label2, etc.
          return acc;
      }, {} as Record<string, string>); 
    
      return labels;
    }    
}