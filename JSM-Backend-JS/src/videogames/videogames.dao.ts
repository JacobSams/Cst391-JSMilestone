import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Videogame } from './videogames.model';
import { vgQueries } from './videogames.queries';

//Get videogames
export const readvideogames = async () => {
return execute<Videogame[]>(vgQueries.readVideogames, []);
}

//Create
export const createVideogame = async (vg: Videogame) => {
return execute<OkPacket>(vgQueries.createVideogame,
[vg.Title, vg.Developer, vg.Rating, vg.Price]);
}

//Update
export const updateVideogame = async (vg: Videogame) => {

return execute<OkPacket>(vgQueries.updateVideogame,
[vg.Title, vg.Developer, vg.Rating, vg.Price, vg.Id]);
}

//Delete
export const deleteVideogame = async (vgId: number) => {

return execute<OkPacket>(vgQueries.deleteVideogame, [vgId]);
}

//Get by id
export function readvideogamesById(vgId: number): any {
    throw new Error('Function not implemented.');
}
