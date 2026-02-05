import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon as PokemonService } from '../../services/pokemon';
import { PokemonModel } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class Pokemon implements OnInit {

  listaPokemon: PokemonModel[] = [];

  mostrarCrear = false;
  mostrarEditar = false;
  mostrarEliminar = false;

  pokemonActual: PokemonModel = new PokemonModel();
  pokemonSeleccionado: PokemonModel | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.cargarPokemons();
  }

  cargarPokemons() {
    this.pokemonService.getPokemons().subscribe({
      next: (res) => this.listaPokemon = res,
      error: (err) => console.error('Error cargando Pokémon', err)
    });
  }

  trackById(index: number, item: any) { return item._id; }

  abrirCrear() {
    this.pokemonActual = new PokemonModel();
    this.mostrarCrear = true;
  }

  abrirEditar(pokemon: PokemonModel) {
    this.pokemonActual = { ...pokemon };
    this.mostrarEditar = true;
  }

  abrirEliminar(pokemon: PokemonModel) {
    this.pokemonSeleccionado = pokemon;
    this.mostrarEliminar = true;
  }

  crear() {
    this.pokemonService.crearPokemon(this.pokemonActual).subscribe(() => {
      this.cargarPokemons();
      this.cerrarModales();
    });
  }

  editar() {
    this.pokemonService.editarPokemon(this.pokemonActual._id!, this.pokemonActual).subscribe(() => {
      this.cargarPokemons();
      this.cerrarModales();
    });
  }

  confirmarEliminar() {
    if (!this.pokemonSeleccionado?._id) return;

    this.pokemonService.eliminarPokemon(this.pokemonSeleccionado._id).subscribe(() => {
      this.cargarPokemons();
      this.cerrarModales();
    });
  }

  cerrarModales() {
    this.mostrarCrear = false;
    this.mostrarEditar = false;
    this.mostrarEliminar = false;
  }
}
