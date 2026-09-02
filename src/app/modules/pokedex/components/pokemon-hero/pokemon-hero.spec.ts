import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonHero } from './pokemon-hero';

describe('PokemonHero', () => {
  let component: PokemonHero;
  let fixture: ComponentFixture<PokemonHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonHero],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
