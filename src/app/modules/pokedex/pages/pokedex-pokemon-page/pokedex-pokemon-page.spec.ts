import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexPokemonPage } from './pokedex-pokemon-page';

describe('PokedexPokemonPage', () => {
  let component: PokedexPokemonPage;
  let fixture: ComponentFixture<PokedexPokemonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexPokemonPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexPokemonPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
