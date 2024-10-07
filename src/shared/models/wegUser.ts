export class WegUser {

    constructor(public Name: string,
                public Unity: string,
                public LastOpened : number = Date.now()){
    }

    toString() : string {
        return `Name: ${this.Name}, Unity: ${this.Unity}`;
    }
}