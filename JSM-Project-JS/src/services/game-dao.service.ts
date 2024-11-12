import { Injectable } from '@angular/core';
import { Videogame } from '../app/models/videogames.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameDAOService {
  private host = "http://localhost:3000/videogames";
  // Needed to setup body info
  private jsonHeader = {'content-type': 'application/json'};

  constructor(private http:HttpClient) { }

  public getVideogames(callback: (games: Videogame[])=>void): void {
    this.http.get<Videogame[]>(this.host).subscribe((games: Videogame[])=>{callback(games)})
  }

  public findVideogame(id:number,callback: (game: Videogame)=>void): void {
    this.http.get<Videogame[]>(this.host+"?vgId="+id).subscribe((game:Videogame[])=>{callback(game[0])})
  }

  public createVideogame(videogame: Videogame): Observable<any>{
    const game =
    "{"+
      "\"Title\": \""+videogame.Title+"\","+
      "\"Developer\": \""+videogame.Developer+"\","+
      "\"Rating\": \""+videogame.Rating+"\","+
      "\"Price\": "+videogame.Price+
    "}"
    console.log(game);
    return this.http.post(this.host, game,{"headers": this.jsonHeader});
  }

  public updateVideogame(videogame: Videogame): Observable<any>{
    const game=
    "{"+
      "\"Id\": \""+videogame.ID+"\","+
      "\"Title\": \""+videogame.Title+"\","+
      "\"Developer\": \""+videogame.Developer+"\","+
      "\"Rating\": \""+videogame.Rating+"\","+
      "\"Price\": "+videogame.Price+
    "}"
    console.log(game)
    return this.http.put(this.host, game, {headers: this.jsonHeader})
  }

  public deleteVideogame(videogame: Videogame): Observable<any>{
    console.log("Deleting Item "+videogame.ID)
    return this.http.delete(this.host+"?vgId="+videogame.ID)
  }
}
