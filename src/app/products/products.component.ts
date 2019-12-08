import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product: Product[] = [];
  category:string;
  filteredProducts:Product[];

  constructor(private productService: ProductService,
     private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(categories => {
      this.product = categories;
      console.log(this.product);
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? this.product.filter(p =>
          p.category == this.category) : this.product;
      })
    });
  }
}
