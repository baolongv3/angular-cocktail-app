import { TestBed } from '@angular/core/testing';

import { IngredientsDetailResolver } from './ingredients-detail.resolver';

describe('IngredientsDetailResolver', () => {
  let resolver: IngredientsDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(IngredientsDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
