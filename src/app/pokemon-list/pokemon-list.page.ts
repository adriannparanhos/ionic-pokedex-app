import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonButton, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { PokemonListItem } from '../interfaces/pokemon.interface';
import { FavoritesService } from '../services/favorites.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: 'pokemon-list.page.html',
  styleUrls: ['pokemon-list.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonButton, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent],
})
export class PokemonListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  pokemons: PokemonListItem[] = [];
  private offset = 0;

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) {}

  async ngOnInit() {
    await this.favoritesService.init();
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    this.pokemonService.getPokemons(this.offset).subscribe(res => {
      this.pokemons = [...this.pokemons, ...res.results];
      event?.target.complete();
      if (this.pokemons.length >= res.count) {
        this.infiniteScroll.disabled = true;
      }
    });
  }

  loadMore(event: any) {
    this.offset += 25;
    this.loadPokemons(event);
  }
  
  isFavorite(pokemonId: number): boolean {
    return this.favoritesService.isFavorite(pokemonId);
  }

  toggleFavorite(pokemon: PokemonListItem, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.favoritesService.toggleFavorite(pokemon.id);
  }
}