import { TestBed } from '@angular/core/testing';

import { PokemonSearch } from './pokemon-search';

describe('PokemonSearch', () => {
  let service: PokemonSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
