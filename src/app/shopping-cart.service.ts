import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Product } from './models/product';
//import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private dbPath = '/shopping-cart/';
  cartRef: AngularFireList<any> = null;
  constructor(private db: AngularFireDatabase) {
    this.cartRef = this.db.list(this.dbPath)
  }

  private Create() {
    return this.db.list(this.dbPath).push({
      dateCreated: new Date().getTime()
    });
  }
  private getCart(cartid) {
    return this.db.object(this.dbPath + '/' + cartid)
  }
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId;
    let data = await this.Create();
    console.log(data)
    localStorage.setItem('cartId', data.key);
    return data.key;
  }
  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    console.log(cartId)
    console.log(product.key)
    //let items=  this.db.list(this.dbPath +cartId+ '/items/'+product.key+'/product/').update('product', product);
    let cartProduct ={
       product,
      'quantity':1
    }
   // let items=  this.db.list(this.dbPath +cartId+ '/items/'+product.key).set('product',cartProduct)
    let items=  this.db.list(this.dbPath +cartId+ '/items/'+product.key)
     items.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
     ).subscribe(data => {
         console.log(data)
         if(data.length >0){
           cartProduct.quantity= data[0]['quantity']+1;
          this.db.list(this.dbPath +cartId+ '/items/'+product.key).update('product',cartProduct)
         }else{ 
          this.db.list(this.dbPath +cartId+ '/items/'+product.key).set('product',cartProduct)
         }
      })  
  
   // let items=  this.db.list(this.dbPath +cartId+ '/items/'+product.key).push(product);
  //  let items= this.db.object(this.dbPath +cartId+ '/items/'+product.key);
  //   items.snapshotChanges().subscribe(item=>{
  //    console.log(item)
  //  // if(item)
  //  // items$.update({quantity:item.quantity+1})
 
  //    })
  }

  
}
