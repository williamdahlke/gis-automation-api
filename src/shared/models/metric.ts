import { ApiProperty } from "@nestjs/swagger";
import { Label } from "./label";
import { WegUser } from "./wegUser";
import { Type } from "class-transformer";

export class Metric{

    @ApiProperty()
    public MetricName : string = "";

    @ApiProperty()
    public Help : string = "";

    @ApiProperty()
    public Type : number = 0;

    @ApiProperty()
    public Operation : number = 0;

    @Type(() => Label)
    @ApiProperty()
    public Label? : Label;

    @Type(() => WegUser)
    @ApiProperty()
    public User? : WegUser;    

    constructor(){}
}
