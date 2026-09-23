import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/service/api-service';
import { PokemonResponse } from '../types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl = environment.api.pokemon;

  constructor(private service: ApiService) {}

  countPokemons() {
    return this.service
      .get<PokemonResponse>(this.baseUrl, 'pokemon')
      .pipe(map((response) => response.count));
  }
}
