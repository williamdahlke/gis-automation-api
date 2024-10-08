import { ApiProperty } from "@nestjs/swagger";
import { Label } from "./label";
import { WegUser } from "./wegUser";

export class Metric{

    @ApiProperty()
    public MetricName : string = "";

    @ApiProperty()
    public Help : string = "";

    @ApiProperty()
    public Type : number = 0;

    @ApiProperty()
    public Operation : number = 0;

    @ApiProperty()
    public Label? : Label;

    @ApiProperty()
    public User? : WegUser;
    
    constructor(){}
}
