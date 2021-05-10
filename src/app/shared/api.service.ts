import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Artist } from './artist.model';
import { Song } from './song.model';
import { Album } from './album.model';
import { Product } from './product.model';
import { Category } from './category.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = 'https://localhost:5001/api';

  addSong(song: Song) {
    return this.http.post(this.baseUrl + '/song', song, { headers: this.header });
  }

  addArtist(artist: Artist) {
    return this.http.post(this.baseUrl + '/artist', artist, { headers: this.header });
  }

  // addAlbum(album) {
  //   return this.http.post(this.baseUrl + '/album', {
  //     'name': album.name,
  //     'releaseYear': album.releaseYear,
  //     'price': album.price,
  //     'studioId': album.studioId,
  //     'ArtistId': JSON.parse('[' + album.artistId + ']'),
  //     'SongId': JSON.parse('[' + album.songId + ']'),
  //     'img': album.img
  //   }, { headers: this.header });

  addProduct(product: Product) {
    return this.http.post(this.baseUrl + '/product', {
      'name': product.name,
      'stock': product.stock,
      'price': product.price,
      'categoryId': product.categoryId,
      'description': product.description,
      //'img': product.img
    }, { headers: this.header });
  }

    addCategory(category: Category) {
    return this.http.post(this.baseUrl + '/category', category, { headers: this.header });
  }


  getAlbum(id: number) {
    return this.http.get(this.baseUrl + '/album/' + id.toString(), { headers: this.header });
  }

  getSong(id: number) {
    return this.http.get(this.baseUrl + '/song/' + id.toString(), { headers: this.header });
  }

  getArtist(id: number) {
    return this.http.get(this.baseUrl + '/artist/' + id.toString(), { headers: this.header });
  }

  getStudio(id: number) {
    return this.http.get(this.baseUrl + '/studio/' + id.toString(), { headers: this.header });
  }

  getAlbums() {
    return this.http.get(this.baseUrl + '/album', { headers: this.header });
  }

  getSongs() {
    return this.http.get(this.baseUrl + '/song', { headers: this.header });
  }

  getArtists() {
    return this.http.get(this.baseUrl + '/artist', { headers: this.header });
  }

  getProduct(id: number){
    return this.http.get(this.baseUrl + '/product/' + id.toString(), { headers: this.header });
  }

  getProducts(){
    return this.http.get(this.baseUrl + '/product', { headers: this.header });
  }

  getCategory(id: number){
    return this.http.get(this.baseUrl + '/category/' + id.toString(), { headers: this.header });
  }

  getCategories(){
    return this.http.get(this.baseUrl + '/category', { headers: this.header });
  }

  deleteAlbum(id: number) {
    return this.http.delete(this.baseUrl + '/album/' + id.toString(), { headers: this.header });
  }

  deleteSong(id: number) {
    return this.http.delete(this.baseUrl + '/song/' + id.toString(), { headers: this.header });
  }

  deleteArtist(id: number) {
    return this.http.delete(this.baseUrl + '/artist/' + id.toString(), { headers: this.header });
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + '/product/' + id.toString(), { headers: this.header });
  }
  editAlbum(album: Album) {

    return this.http.put(this.baseUrl + '/album/' + album.id.toString(), album, { headers: this.header });
  }

  editArtist(artist: Artist) {
    return this.http.put(this.baseUrl + '/artist/' + artist.id.toString(), artist, { headers: this.header });
  }

  editSong(song: Song) {
    return this.http.put(this.baseUrl + '/song/' + song.id.toString(), song, { headers: this.header });
  }

  editProduct(product: Product) {

    return this.http.put(this.baseUrl + '/product/' + product.id.toString(), product, { headers: this.header });
  }

}

