import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories;
  constructor(private categoryService:CategoryService,private productService:ProductService) {
   }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    }); 
  }
  save(product){
  this.productService.create(product);
  console.log(product);
  }
}
