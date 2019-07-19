import { TestBed } from '@angular/core/testing';

import { ProductParamterService } from './product-paramter.service';

describe('ProductParamterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductParamterService = TestBed.get(ProductParamterService);
    expect(service).toBeTruthy();
  });
});
