import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Album } from '../shared/album.model';
import { Artist } from '../shared/artist.model';
import { Song } from '../shared/song.model';
import { EditAlbumModalComponent } from './edit-album-modal/edit-album-modal.component';
import { EditArtistModalComponent } from './edit-artist-modal/edit-artist-modal.component';
import { EditSongModalComponent } from './edit-song-modal/edit-song-modal.component';
import { Product } from '../shared/product.model';
import { EditProductModalComponent } from './edit-product-modal/edit-product-modal.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productss: Product[] = [];
  artists: Artist[] = [];
  songs: Song[] = [];



  @ViewChild('editProductModal') editProductModal: EditProductModalComponent;
  @ViewChild('editArtistModal') editArtistModal: EditArtistModalComponent;
  @ViewChild('editSongModal') editSongModal: EditSongModalComponent;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getProducts();
    this.getArtists();
    this.getSongs();
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

  getArtists() {

    this.api.getArtists()
      .subscribe((data: Artist[]) => {
        this.artists = data;
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  getSongs() {
    this.api.getSongs()
      .subscribe((data: Song[]) => {
        this.songs = data;
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

  deleteArtist(id: number) {
    this.api.deleteArtist(id)
      .subscribe(() => {
        this.getArtists();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  deleteSong(id: number) {
    this.api.deleteSong(id)
      .subscribe(() => {
        this.getSongs();
      },
        (error: Error) => {
          console.log(error);
        });

  }

  showM1(id: number): void {
    this.editProductModal.show(id);
  }

  showM2(id: number): void {
    this.editArtistModal.show(id);
  }

  showM3(id: number): void {
    this.editSongModal.show(id);
  }

  changeE(event: string) {
    if (event === 'product') {
      this.getProducts();
    }
    if (event === 'artist') {
      this.getArtists();
    }
    if (event === 'song') {
      this.getSongs();
    }


  }

}
