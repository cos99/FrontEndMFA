import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { ApiService } from '../shared/api.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  searchText: string;
  title: string;

  @ViewChild('detailModal') detailModal: DetailModalComponent;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProducts().subscribe((data: Product[]) => {

      for (let i = 0; i < data.length; i++) {
        this.api.getProduct(data[i].id).subscribe((info: Product) => {
          info.id = data[i].id;
          if (!info.img) {
            info.img = 'https://media.tenor.com/images/8fde221a3866d13faa26354f190be20c/tenor.gif';
          }
        
          this.products.push(info);
        },
          (e: Error) => {
            console.log('err', e);
          });
      }
    },
      (er: Error) => {
        console.log('err', er);
      });
  }

  showDM(id: number): void {
    this.detailModal.show(id);
  }
}
