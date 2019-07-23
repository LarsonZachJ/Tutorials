import { Component, OnInit, OnDestroy } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-shell-list',
  templateUrl: './product-shell-list.component.html',
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;
  sub: Subscription;

  onSelected(product: IProduct) {
    this.productService.changeSelectedProduct(product);
  }

  constructor(private productService: ProductService) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.productService.selectedProductChanges$.subscribe(
      selectedProduct => (this.selectedProduct = selectedProduct)
    );
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }
}
