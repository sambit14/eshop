import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';

  AllProductRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.AllProductRef = db.list(this.dbPath);

  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): AngularFireList<any> {
    return this.AllProductRef;
  }

  get(productId) {
    return this.db.object(`${this.dbPath}/${productId}`);
  }
  upDate(productid, product) {
    return this.db.object(`${this.dbPath}/${productid}`).update(product);
  }

  DeleteProduct(productid) {
    return this.db.object(`${this.dbPath}/${productid}`).remove();

  }


}
