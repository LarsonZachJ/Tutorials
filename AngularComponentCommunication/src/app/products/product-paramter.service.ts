import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductParamterService {
  showImage: boolean;
  filterBy: string;

  constructor() {}
}
