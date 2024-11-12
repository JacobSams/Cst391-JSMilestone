import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameInputComponent } from './game-input/game-input.component';

export const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "games", component: GameListComponent},
  { path: "newGame", component: GameInputComponent},
  { path: "editGame", component: GameInputComponent}
];
