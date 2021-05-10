export class Product {
    id: number;
    name: string;
    stock: number;
    price: number;
    description: string;
    categoryId: number;
    img: string;
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 