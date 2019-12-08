import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories;
  @Input('category') category;
  constructor(private categoryService: CategoryService) { }

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
}
