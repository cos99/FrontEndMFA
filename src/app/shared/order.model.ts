export class Order{
    id: number;
    userId: number;
    date: string;
    orderDetail: string[];
    
    constructor(input?: any) {
        Object.assign(this, input);
  }
}