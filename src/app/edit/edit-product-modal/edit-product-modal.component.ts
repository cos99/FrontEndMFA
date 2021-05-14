import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Product } from '../../shared/product.model';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})

export class EditProductModalComponent {
  @ViewChild('editProductModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editProductForm: FormGroup;
  currentProduct = new Product();


  constructor(public fb: FormBuilder, private api: ApiService) { }

  show(id: number): void {
    this.modal.show();
    this.api.getProduct(id)
      .subscribe((data: Product) => {
        this.currentProduct = data;
        this.currentProduct.id = id;
        this.initializeFrom(this.currentProduct);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(currentProduct: Product) {
    this.editProductForm = this.fb.group({
      name: [currentProduct.name, Validators.required],
      price: [currentProduct.price, Validators.required],
      stock: [currentProduct.stock, Validators.required],
      categoryId: [currentProduct.categoryId, Validators.required],
      description: [currentProduct.description, Validators.required],
      img: [currentProduct.img],
    });
  }

  editProduct() {
    const editedProduct = new Product({
      id: this.currentProduct.id,
      name: this.editProductForm.value.name,
      price: this.editProductForm.value.price,
      categoryId: this.editProductForm.value.categoryId,
      description: this.editProductForm.value.description,
      img: this.editProductForm.value.img
    });

    this.api.editProduct(editedProduct)
      .subscribe(() => {
        this.change.emit('product');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }


}
