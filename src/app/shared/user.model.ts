export class User{
    id: number;
    name: string;
    username: string;
    password: string;
    phoneNumber: string;
    email: string;
    adresa: string;
    cartProducts: string[];
    orderUser: string[]; 
    
    constructor(input?: any) {
        Object.assign(this, input);
  }
}