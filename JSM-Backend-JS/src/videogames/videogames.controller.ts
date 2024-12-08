import { Request, RequestHandler, Response } from 'express';
import { Videogame } from './videogames.model';
import * as vgDao from './videogames.dao';
import { OkPacket } from 'mysql';

export const getVideoGames: RequestHandler = async (req: Request, res: Response) => {
  try {
    let videogames;
    let id = parseInt(req.query.vgId as string);

    console.log('vgId', id);
    if (Number.isNaN(id)) {
      videogames = await vgDao.readvideogames();
    } else {
      videogames = await vgDao.findVideogame(id);
    }

    res.status(200).json(videogames);
  } catch (error) {
    console.error('[videogames.controller][readvideogames][Error]: ', error);
    res.status(500).json({
      message: 'There was an error when fetching videogames'
    });
  }
};

export const createVideogame: RequestHandler = async (req: Request, res: Response) => {
    console.log('body:',req.body);
    try{
        const packet: OkPacket = await vgDao.createVideogame(req.body);
        console.log('req.body',req.body);
        console.log('videogame', packet);

        res.status(200).json(packet);
    } catch (error) {
        console.error('[videogames.controller][createVideogame][Error] ',error);
        res.status(500).json({message: `There was an error creating a videogame`});
    }
}

export const updateVideogame: RequestHandler = async (req: Request, res: Response) =>{
    try{
        console.log("Updating Entry...")
        console.log(req.body)
        const packet: OkPacket = await vgDao.updateVideogame(req.body);

        res.status(200).json(packet);
    }catch(error){
        res.status(500).json({message: `Error updating videogame`});
    }
}

export const deleteVideogame: RequestHandler = async (req: Request, res: Response) =>{
    console.log(req.params);
    try{
        let id =  parseInt(req.query.vgId as string);

        if(!Number.isNaN(id)){
            const response = await vgDao.deleteVideogame(id);

            res.status(200).json(response);
        } else{
            throw new Error("Integer expected for vgId");
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Error deleting videogame`
        });
    }
}