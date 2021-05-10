
import {Injectable} from '@angular/core';
import {Product} from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Product[] =[];
  quantity: number;
  
  
  constructor() {

  }

  add(product: Product){
    this.products.push(product);

  }

  get() {
    return this.products;
  }


}
