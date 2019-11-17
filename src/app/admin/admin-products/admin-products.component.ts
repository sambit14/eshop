import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  product:Product[];
  subscription :Subscription;
  filteredProduct:any[];
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.subscription= this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(categories => {
      this.product = this.filteredProduct = categories;
      console.log(this.product);
    }); 
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  search(query:string){
   console.log(query);
  //  this.filteredProduct = (query)?
  //         this.product.filter(p =>p.title).includes(query):this.product
  if(query == ''){
    this.product =this.filteredProduct;
    return;
  }
  const filterdata=  this.product.filter(p =>{
     return p.title.trim().toLowerCase().includes(query.trim().toLowerCase())
   });
  if(filterdata.length != 0) {
    this.product = filterdata;
  }
  }
}
