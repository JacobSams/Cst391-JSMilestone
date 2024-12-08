import React, { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard";
import GameDAOService from "../../services/GameDAOService";

const GameList = (props) =>{
    
    // Selecting a Game
    // ID
    const [selectedGameID, setSelectedGameID] = useState(-1);
    function pickGame(id){
        console.log("selected ID: "+selectedGameID)
        if(selectedGameID!==id){
            setSelectedGameID(parseInt(id));
        }
        else{
            setSelectedGameID(-1);
        }
    }
    // Game Obj
    const [selectedGame, setGame] = useState([]);

    //updates the selected game when the ID changes
    useEffect(()=>{
        console.log("New selected ID: "+selectedGameID)
        if(selectedGameID !== -1) loadGame();
        else setGame([]);
    }, [selectedGameID])

    const loadGame = async () => {
        const response = await GameDAOService.get('/videogames?vgId='+selectedGameID);
        console.log(response.data)
        setGame(response.data);
        console.log(selectedGame)
    }



    // Game List Generation
    const games = props.games.map((game) => {
        return(<button className="btn shadow" key={game.ID} onClick={()=>pickGame(game.ID)}>{game.Title}</button>)
    });

    return(<>
        <div className="container h-100">
            <div className="d-flex flex-column justify-content-around">{games}</div>
        </div>
        {selectedGame.length>0 && <GameCard game={selectedGame[0]}/>}
    </>)
}

export default GameList;