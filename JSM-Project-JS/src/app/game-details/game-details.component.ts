import { Component, Input, OnInit } from '@angular/core';
import { Videogame } from '../models/videogames.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent implements OnInit{
  @Input() videogame!: Videogame;
  private selectedVideogame!: Videogame;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.selectedVideogame=this.videogame;
  }

  Videogame(){return this.selectedVideogame}

  editGame(){
    console.log(JSON.stringify(this.selectedVideogame))
    console.log('ID: ',this.selectedVideogame.ID)
    this.router.navigate(['/editGame'],{queryParams:{gameId: this.selectedVideogame.ID}});
  }
}
