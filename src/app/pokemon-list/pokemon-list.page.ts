import { Component, OnInit, ViewChild } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInfiniteScroll } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonListItem } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-pokemon-list.page',
  templateUrl: 'pokemon-list.page.html',
  styleUrls: ['pokemon-list.page.scss'],
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class PokemonListPage {
  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) {}

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  pokemons: PokemonListItem[] = [];
  private offset = 0;
  

}
