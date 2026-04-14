import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPagination } from './pokemon-pagination';

describe('PokemonPagination', () => {
  let component: PokemonPagination;
  let fixture: ComponentFixture<PokemonPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonPagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
