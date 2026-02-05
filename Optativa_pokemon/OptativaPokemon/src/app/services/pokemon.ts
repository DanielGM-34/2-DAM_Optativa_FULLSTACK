import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {

  private url = 'http://localhost:4000/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get<{ _id?: string; nombre: string; tipo: string; descripcion: string }[]>(this.url);
  }

  getPokemon(id: string) {
    return this.http.get<{ _id?: string; nombre: string; tipo: string; descripcion: string }>(`${this.url}/${id}`);
  }
 
  crearPokemon(pokemon: { nombre: string; tipo: string; descripcion: string }) {
    return this.http.post(this.url, pokemon);
  }

  editarPokemon(id: string, pokemon: { nombre: string; tipo: string; descripcion: string }) {
    return this.http.put(`${this.url}/${id}`, pokemon);
  }

  eliminarPokemon(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
