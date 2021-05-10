export class Category {
    id: number;
    name: string;
    productList: string[];
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 