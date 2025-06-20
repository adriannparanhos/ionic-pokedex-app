import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { FavoritesService } from '../services/favorites.service';

const storageMock = {
  _internal: new Map<string, any>(),
  async create() {
    return this;
  },
  async get(key: string) {
    return this._internal.get(key);
  },
  async set(key: string, value: any) {
    this._internal.set(key, value);
  },
  async clear() {
    this._internal.clear();
  }
};

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: storageMock }
      ]
    });

    storageMock.clear();
    service = TestBed.inject(FavoritesService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a pokemon to favorites', async () => {
    await service.toggleFavorite(25);
    expect(service.isFavorite(25)).toBeTrue();
  });

  it('should remove a pokemon from favorites', async () => {
    await service.toggleFavorite(25); 
    await service.toggleFavorite(25); 
    expect(service.isFavorite(25)).toBeFalse();
  });
  
  it('should return all favorite IDs', async () => {
    await service.toggleFavorite(1);
    await service.toggleFavorite(4);
    await service.toggleFavorite(7);
    const ids = service.getFavoriteIds();
    expect(ids.length).toBe(3);
    expect(ids).toEqual([1, 4, 7]);
  });

  it('should load initial favorites from storage', async () => {
    await storageMock.set('pokemon-favorites', [1, 4, 7]);
    
    const newServiceInstance = new FavoritesService(TestBed.inject(Storage));
    await newServiceInstance.init();

    expect(newServiceInstance.isFavorite(4)).toBeTrue();
    expect(newServiceInstance.getFavoriteIds().length).toBe(3);
  });
});