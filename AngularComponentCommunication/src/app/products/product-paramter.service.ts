import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductParamterService {
  showImage: boolean = false;
  filterBy: string = '';

  constructor() {}
}
