import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-pokemon-list.page',
  templateUrl: 'pokemon-list.page.html',
  styleUrls: ['pokemon-list.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class PokemonListPage {
  constructor() {}
}
