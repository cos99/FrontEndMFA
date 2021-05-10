import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {
  @ViewChild('cartModal') modal: ModalDirective;
  productss: Product[] = [];
  sum = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  
  
  show() {
    this.modal.show();
    this.productss = this.cartService.get();
    for (let i = 0; i < this.productss.length; i++) {
      this.sum += this.productss[i].price;
    }
  } 

  delete(id: number, price: number) {
    this.productss.splice(id, 1);
    this.sum = this.sum - price;
  }
}
