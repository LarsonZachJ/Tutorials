import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@app/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() errorMessage: string;
  @Input() displayCode: boolean;
  @Input() products: Array<Product>;
  @Input() selectedProduct: Product;
  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewProdcut = new EventEmitter();
  @Output() selected = new EventEmitter<Product>();

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }
  initializeNewProduct(): void {
    this.initializeNewProdcut.emit();
  }
  productSelected(product: Product): void {
    this.selected.emit(product);
  }
}
