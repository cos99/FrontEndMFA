import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Product } from '../shared/product.model';
import { EditProductModalComponent } from './edit-product-modal/edit-product-modal.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productss: Product[] = [];



  @ViewChild('editProductModal') editProductModal: EditProductModalComponent;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.api.getProducts()
      .subscribe((data: Product[]) => {
        this.productss = [];

        for (let i = 0; i < data.length; i++) {
          this.api.getProduct(data[i].id)
            .subscribe((info: Product) => {
              info.id = data[i].id;
              this.productss.push(info);
            },
              (e: Error) => {
                console.log('err', e);
              });
        }

      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  


  deleteProduct(id: number) {
    this.api.deleteProduct(id)
      .subscribe(() => {
        this.productss = [];
        this.getProducts();
      },
        (error: Error) => {
          console.log(error);
        });
  }




  showM1(id: number): void {
    this.editProductModal.show(id);
  }




  changeE(event: string) {
    if (event === 'product') {
      this.getProducts();
    }

  }

}
