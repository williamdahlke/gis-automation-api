import { ApiProperty } from "@nestjs/swagger";

export class WegUser {

    @ApiProperty()
    public Name: string;

    @ApiProperty()
    public Unity: string;

    @ApiProperty()
    public LastOpened : number;

    constructor(Name: string,
                Unity: string,
                LastOpened : number = Date.now()){
        this.Name = Name;
        this.Unity = Unity;
        this.LastOpened = LastOpened;
    }

    toString() : string {
        return `Name: ${this.Name}, Unity: ${this.Unity}`;
    }
}