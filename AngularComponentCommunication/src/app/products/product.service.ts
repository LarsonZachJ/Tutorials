import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';
import { Observable, of, throwError, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductService {
  private productsUrl = 'api/products';
  private products: Array<IProduct>;

  private selectedProductSource = new BehaviorSubject<IProduct | null>(null);
  selectedProductChanges$ = this.selectedProductSource.asObservable();

  changeSelectedProduct(selectedProduct: IProduct | null): void {
    this.selectedProductSource.next(selectedProduct);
  }

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Array<IProduct>> {
    if (this.products) {
      return of(this.products);
    } else {
      return this.http.get<Array<IProduct>>(this.productsUrl).pipe(
        tap(data => console.log({ data })),
        tap(products => (this.products = products)),
        catchError(this.handleError)
      );
    }
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    if (this.products) {
      const foundItem = this.products.find(item => item.id === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url).pipe(
      tap(data => console.log('Data: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${
        err.error
      }`;
    }
    return throwError(errorMessage);
  }

  deleteProduct(id: number): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<IProduct>(url, { headers: headers }).pipe(
      tap(data => console.log('deleteProduct: ' + id)),
      tap(
        data => (this.products = this.products.filter(item => item.id !== id))
      ),
      tap(data => this.changeSelectedProduct(null)),
      catchError(this.handleError)
    );
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (product.id === 0) {
      return this.createProduct(product, headers);
    }
    return this.updateProduct(product, headers);
  }

  private createProduct(
    product: IProduct,
    headers: HttpHeaders
  ): Observable<IProduct> {
    product.id = null;
    return this.http
      .post<IProduct>(this.productsUrl, product, { headers: headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        tap(data => this.products.push(data)),
        tap(data => this.changeSelectedProduct(data)),
        catchError(this.handleError)
      );
  }

  private initializeProduct(): IProduct {
    // Return an initialized object
    return {
      id: 0,
      productName: '',
      productCode: '',
      category: '',
      tags: [],
      releaseDate: '',
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: '',
    };
  }

  private updateProduct(
    product: IProduct,
    headers: HttpHeaders
  ): Observable<IProduct> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers: headers }).pipe(
      tap(data => console.log('updateProduct: ' + product.id)),
      tap(
        data =>
          (this.products = this.products.map(item => {
            if (item.id === data.id) {
              return product;
            }
            return item;
          }))
      ),
      catchError(this.handleError)
    );
  }
}
