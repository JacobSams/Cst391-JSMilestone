import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteMessage from "../DeleteMessage/DeleteMessage";

const GameCard = (props) =>{

    const navigate = useNavigate();
    const [deleting,setDeleting] = useState(false);

    const edit = () =>{
        navigate('/Edit/'+props.game.ID)
    }

    const toggleDelete = () => {
        setDeleting(!deleting);
    }

    return(
        <div className="bg-black text-white rounded shadow">
            <h1>{props.game.Title}</h1>
            <h2>{props.game.Developer}</h2>
            <h3 className="bg-white text-black">{props.game.Rating}</h3>
            <h4>{props.game.Price}</h4>
            <button type="button" className="btn btn-primary" onClick={edit}>Edit</button>
            {!deleting
            ?(<button type="button" className="btn btn-danger" onClick={toggleDelete}>Delete</button>)
            :(<DeleteMessage game={props.game} cancelFunction={toggleDelete}/>)}
        </div>
    )

}

export default GameCard;