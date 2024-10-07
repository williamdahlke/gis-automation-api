import { Label } from "./label";
import { WegUser } from "./wegUser";

export class Metric{

    public MetricName : string = "";
    public Help : string = "";
    public Type : number = 0;
    public Operation : number = 0;
    public Label? : Label;
    public User? : WegUser;
    
    constructor(){}
}
