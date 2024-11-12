import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Videogame } from '../models/videogames.model';
import { GameDAOService } from '../../services/game-dao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-input',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './game-input.component.html',
  styleUrl: './game-input.component.css'
})
export class GameInputComponent implements OnInit{
  @Input() gameId : number=-1;
  private videogame!: Videogame;
  private editing: boolean = false;

  constructor(private service: GameDAOService, private router: Router){}

  ngOnInit(): void {
    console.log(JSON.stringify(this.videogame)," Game ID: ",this.gameId)
    if(!(this.gameId<=-1) && this.gameId!=undefined){
      console.log("Finding videogame by ID...")
      this.editing=true;
      try{
        this.service.findVideogame(this.gameId,(game:Videogame)=>{
          this.videogame=game;
        })
      }catch{console.log("Find by ID unsuccessful");this.editing=false}
    }
    if(this.videogame == null){
      this.videogame = {
        ID: 0,
        Title: "",
        Developer: "",
        Price: 0.00,
        Rating: ""
      }
    }
    else{this.editing=true}
    console.log(JSON.stringify(this.videogame))
  }

  Videogame(){return this.videogame}

  isEditing(){return this.editing}

  onSubmit(){
    if(!this.editing){
      this.service.createVideogame(this.videogame).subscribe()
      this.router.navigate(['games'])
    }
    else{
      this.service.updateVideogame(this.videogame).subscribe()
      this.router.navigate(['games'])
    }
  }

  deleteClicked=false;
  deletePrompt(){
    this.deleteClicked=!this.deleteClicked
  }

  deleteVideogame(){
    this.service.deleteVideogame(this.videogame).subscribe()
    this.router.navigate(['games'])
  }
}
