import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDAOService } from '../../services/game-dao.service';
import { Videogame } from '../models/videogames.model';
import { GameDetailsComponent } from "../game-details/game-details.component";
import { MobileDetectionService } from '../../services/mobile-detection';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, GameDetailsComponent],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit{
  private static videogames: Videogame[];
  selectedVideogame: Videogame |null=null;
  isMobile!:boolean;

  constructor(private service: GameDAOService, private mobileDetector: MobileDetectionService, private changeDetectorRef: ChangeDetectorRef){
    this.mobileDetector.isMobile.subscribe(bool => this.isMobile=bool);
  }

  ngOnInit(): void {
    this.getData()
  }

  private getData():void{
    this.service.getVideogames((games:Videogame[])=>{
      GameListComponent.videogames=games;
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

  Videogames(): Videogame[]{return GameListComponent.videogames}
}
