import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { forkJoin } from 'rxjs';
import { PokemonListItem } from '../interfaces/pokemon.interface';
import { FavoritesService } from '../services/favorites.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonButton, IonIcon],
})
export class FavoritesPage {
  favoritePokemons: PokemonListItem[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private pokemonService: PokemonService
  ) {}

  async ionViewWillEnter() {
    await this.favoritesService.init();
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritePokemons = [];
    const favoriteIds = this.favoritesService.getFavoriteIds();

    if (favoriteIds.length === 0) {
      return;
    }

    const requests = favoriteIds.map(id => this.pokemonService.getPokemonDetails(id.toString()));
    
    if (requests.length > 0) {
        forkJoin(requests).subscribe(detailsArray => {
        this.favoritePokemons = detailsArray.map(details => ({
            name: details.name,
            url: '',
            id: details.id,
            image: details.sprites.front_default
        }));
        });
    }
  }
  
  toggleFavorite(pokemon: PokemonListItem, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.favoritesService.toggleFavorite(pokemon.id).then(() => {
      this.loadFavorites();
    });
  }
}