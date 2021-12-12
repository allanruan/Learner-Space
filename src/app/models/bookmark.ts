export class Bookmark{
    _id:number;
    name:string;
    source:Source[];
    owner:string;
    // Ldate:Date;
    // comfort:string;
}
export class Source{
    sourcename:string;
    sourceurl:string;
    constructor(sourcename: string, sourceurl: string) {
        this.sourcename=sourcename;
        this.sourceurl=sourceurl
    }
}
