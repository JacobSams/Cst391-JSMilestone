import React from "react";
import { useNavigate } from "react-router-dom";
import GameDAOService from "../../services/GameDAOService";

const DeleteMessage = (props) => {
    const navigate = useNavigate();
    const game = props.game;

    const deleteGame=async()=>{
        let id = props.game.ID;
        console.log(id);
        let response = await GameDAOService.delete("/videogames/?vgId="+id);
        console.log(response.data)
        navigate("/");
    }


    return(
        <div className="container rounded bg-danger text-white">
            <h1>Confirm Deletion Of {game.Title}</h1>
            <button type="button" className="btn btn-danger shadow" onClick={deleteGame}>Confirm</button>
            <button type="button" className="btn btn-secondary" onClick={props.cancelFunction}>Cancel</button>
        </div>
    )
}

export default DeleteMessage;