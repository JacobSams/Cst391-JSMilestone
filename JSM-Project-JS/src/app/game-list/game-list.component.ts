import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDAOService } from '../../services/game-dao.service';
import { Videogame } from '../models/videogames.model';
import { GameDetailsComponent } from "../game-details/game-details.component";

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, GameDetailsComponent],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit{
  private videogames!: Videogame[];
  selectedVideogame: Videogame |null=null;
  constructor(private service: GameDAOService, private changeDetectorRef: ChangeDetectorRef){}

  ngOnInit(): void {
    this.getData()
  }

  private getData():void{
    this.service.getVideogames((games:Videogame[])=>{
      this.videogames=games;
    })
  }

  selectVideogame(videogame: Videogame): void{
    if(this.selectedVideogame != videogame){
      this.selectedVideogame=null;
      this.changeDetectorRef.detectChanges();
      this.selectedVideogame=videogame;
    }
    else{this.selectedVideogame = null}
  }

  Videogames(): Videogame[]{return this.videogames}
}
