import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonResponse } from '../../types';
import { HomeService } from '../../services/home-service';
@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit {
  pokedex!: number;

  constructor(private service: HomeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.contPokedex();
  }

  contPokedex(): void {
    this.service.countPokemons().subscribe({
      next: (count) => {
        this.pokedex = count;
        this.cdr.detectChanges();
      }
    })
  }
}
