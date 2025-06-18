import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const FAVORITES_KEY = 'pokemon-favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private _storage: Storage | null = null;
  private favoriteIds: Set<number> = new Set();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const storedFavorites = await this._storage.get(FAVORITES_KEY);
    if (storedFavorites) {
      this.favoriteIds = new Set(storedFavorites);
    }
  }

  isFavorite(pokemonId: number): boolean {
    return this.favoriteIds.has(pokemonId);
  }

  async toggleFavorite(pokemonId: number) {
    if (this.isFavorite(pokemonId)) {
      this.favoriteIds.delete(pokemonId);
    } else {
      this.favoriteIds.add(pokemonId);
    }
    await this._storage?.set(FAVORITES_KEY, Array.from(this.favoriteIds));
  }

  getFavoriteIds(): number[] {
    return Array.from(this.favoriteIds);
  }
}