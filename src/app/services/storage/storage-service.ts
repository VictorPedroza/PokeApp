import { Injectable } from '@angular/core';

/**
 * Serviço responsável pelo gerenciamento de persistência de dados no LocalStorage do navegador.
 * Fornece métodos utilitários para manipulação de objetos complexos através de conversão JSON.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {

  /**
   * Armazena um item no localStorage.
   * O valor é automaticamente convertido para uma string JSON.
   *
   * @param {string} key Chave identificadora do dado.
   * @param {any} value O dado a ser armazenado (objeto, array, string, number, etc).
   */
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Recupera um item do localStorage e o converte de volta para o seu formato original.
   * @param {string} key Chave identificadora do dado.
   * @returns O dado convertido (Object/Array/etc) ou `null` caso não exista ou seja inválido.
   */
  get(key: string): any {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Erro ao realizar o parse do localStorage para a chave: " + key, e);
      return null;
    }
  }

  /**
   * Remove um item específico do armazenamento baseado na chave fornecida.
   * @param {string} key Chave do item a ser removido.
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Limpa todos os dados armazenados no localStorage para o domínio da aplicação.
   */
  clear(): void {
    localStorage.clear();
  }
}
