import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  options = ['Product', 'Category'];
  selectedOption = 'Product';
  currentFormRef: any;
  addProductForm: FormGroup;
  addCategoryForm: FormGroup;
  success: boolean;

  constructor(public fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {

    this.addProductForm = this.fb.group({
      name: [null, Validators.required],
      stock: [null, Validators.required],
      price: [null, Validators.required],
      categoryId: [null, Validators.required],
      description: [null, Validators.required],
      img: [null]
    });

    this.addCategoryForm = this.fb.group({
      name: [null, Validators.required],
    });
    this.currentFormRef = this.addProductForm;

  }

  radioChange(event: any) {
    this.selectedOption = event.target.value;
    this.currentFormRef = this['add' + this.selectedOption + 'Form'];
  }

  add() {
  
    this.api['add' + this.selectedOption](this.currentFormRef.value).subscribe(() => {

      this.currentFormRef.reset();
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
    },
      (error: Error) => {
        console.log(error);
        this.currentFormRef.reset();
        this.success = false;
        setTimeout(() => {
          this.success = null;
        }, 3000);
      });

  }
}
