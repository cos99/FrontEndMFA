import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from '../../shared/api.service';
import { CartService } from '../../shared/cart.service';
import { Product } from '../../shared/product.model';
import { Category } from '../../shared/category.model';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent implements OnInit {
  @ViewChild('detailModal') modal: ModalDirective;
  product = new Product();
  studio: string;
  isLoggedIn: string;

  constructor(private api: ApiService, private cart: CartService) { }

  ngOnInit() {}

  show(id: number): void {
    this.getProduct(id);
    this.modal.show();
  }


  getProduct(id: number) {
    this.api.getProduct(id)
      .subscribe((data: Product) => {
        this.product = data;
        this.product.id = id;
        if (!data.img) {
          this.product.img = 'https://i.ibb.co/0cBJC3N/3.jpg';
        }
      },
        (err: Error) => {
          console.log('err', err);

        });
  }

  
  
  addCart(product: Product) {
    this.cart.add(product);
    this.modal.hide();
  }
  
}
