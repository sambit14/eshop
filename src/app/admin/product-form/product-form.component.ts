import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories;
  product ={} ;
  productkey;
  productInfo:any;
  id;
  constructor(private categoryService:CategoryService,
    private productService:ProductService,private router:Router,private route:ActivatedRoute) {
      this.id= this.route.snapshot.paramMap.get('id');
      console.log(this.id);
      if(this.id){
      this.productService.get(this.id)
      .snapshotChanges().subscribe(productInfo =>{
       this.productInfo =productInfo;
       console.log(this.productInfo)
       this.productkey = this.productInfo.payload.key;
       this.product = this.productInfo.payload.val();
       console.log( this.product);
     });
    // .snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // ).subscribe(product => {
    //   this.product = product;
    //   console.log(this.product);
    // }); 
    
     }
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
  save(product) {
    if (this.id) {
      this.productService.upDate(this.id, product)
      console.log(product);
    } else { this.productService.create(product); }

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm('Are you sure you want to delete this product') == true){
      this.productService.DeleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
