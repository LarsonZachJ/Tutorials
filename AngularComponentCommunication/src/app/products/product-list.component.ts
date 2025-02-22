import { Component, OnInit, ViewChild } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '@app/shared/criteria/criteria.component';
import { ProductParamterService } from './product-paramter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  @ViewChild(CriteriaComponent, { static: false })
  filterComponent: CriteriaComponent;

  parentListFilter: string;

  includeDetail: boolean = true;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }
  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  // onFilterChange(filter: string): void {
  //   this.listFilter = filter;
  //   this.performFilter(this.listFilter);
  // }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onFilterChange(filterValue: string): void {
    this.performFilter(filterValue);
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product: IProduct) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  ngAfterViewInit(): void {
    this.filterComponent.listFilter = this.productParameterService.filterBy;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.productParameterService.filterBy);
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  constructor(
    private productService: ProductService,
    private productParameterService: ProductParamterService
  ) {}
}
