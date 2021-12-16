import { Copy } from "./copy";

export class Book {
    public copies: Copy[]

    constructor(
        public id: string, 
        public name: string, 
        public author: string,
        public publicationDate?: string) { }
}
