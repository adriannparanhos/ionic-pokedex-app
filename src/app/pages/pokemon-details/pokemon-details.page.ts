import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonChip, IonLabel, IonBadge, IonProgressBar, IonIcon, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { PokemonDetails } from 'src/app/interfaces/pokemon.interface';
import { FavoritesService } from 'src/app/services/favorites.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [IonSpinner, CommonModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonChip, IonLabel, IonBadge, IonProgressBar, IonIcon, IonButton]
})
export class PokemonDetailsPage implements OnInit {
  pokemon: PokemonDetails | null = null;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) {}

  async ngOnInit() {
    await this.favoritesService.init();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonDetails(id).subscribe(details => {
        this.pokemon = details;
        this.checkFavoriteStatus();
      });
    }
  }

  checkFavoriteStatus() {
    if (this.pokemon) {
      this.isFavorite = this.favoritesService.isFavorite(this.pokemon.id);
    }
  }

  toggleFavorite() {
    if (this.pokemon) {
      this.favoritesService.toggleFavorite(this.pokemon.id).then(() => {
        this.checkFavoriteStatus();
      });
    }
  }
}