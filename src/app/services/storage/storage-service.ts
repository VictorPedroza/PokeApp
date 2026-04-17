import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Erro ao ler do localStorage", e);
      return null;
    }
  }

  remove(key: string): void { // Removido o 'any' do retorno pois removeItem não retorna nada
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
