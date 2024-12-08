import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameDAOService from "../../services/GameDAOService";

const GameForm = (props) => {
    const { vgID } = useParams();

    const videogame = {
        Title: '',
        Developer: '',
        Rating: '',
        Price: 0.00
    };

    const [game, setGame] = useState(videogame);

    const loadGame = async () => {
        try {
            const response = await GameDAOService.get('/videogames/?vgId=' + vgID);
            console.log("Loading Game...")
            console.log(response.data[0]);
            setGame(response.data[0]); // Update state with fetched game data
            console.log(videogame);
        } catch (error) {
            console.error("Error loading game:", error);
        }
    };

    useEffect(() => {
        if (props.editing) {
            console.log(vgID);
            loadGame(); // Only run when editing mode is active
        }
    }, [props.editing, vgID]); // Run effect when these change

    // VARIABLES
    /*
    const [title,setTitle]=useState(game.Title)
    const [developer,setDeveloper]=useState(game.Developer)
    const [rating,setRating]=useState(game.Rating)
    const [price,setPrice]=useState(game.Price)
    */
    const navigate = useNavigate();

    // Update Methods
    const updateField = (field, value) => {
        console.log(field+": "+value)
        setGame((prevGame) => ({
            // "...prevGame" allows all other attributes of existing game to stay the same
            ...prevGame,
            [field]: value
        }));
    };
    
    /*
    const updateTitle = (event) =>{
        setTitle(event.target.value);
        console.log("Title: "+title);
    }
    const updateDeveloper = (event) =>{
        setDeveloper(event.target.value);
        console.log("Dev: "+developer);
    }
    const updateRating = (event) =>{
        setRating(event.target.value);
        console.log("Rating: "+rating);
    }
    const updatePrice = (event) =>{
        setPrice(event.target.value);
        console.log("Price: "+price);
    }
    */

    // Form Submission
    const formSubmit = (event) =>{
        event.preventDefault();
        console.log("In Submit...")
        const newGame={
            Id: vgID,
            Title: game.Title,
            Developer: game.Developer,
            Rating: game.Rating,
            Price: game.Price
        }
        console.log("Game: ");
        console.log(newGame);
        saveGame(newGame);
    }

    // API Edit/New Call
    const saveGame = async (newVideogame) =>{
        let response;
        if(props.editing){
            console.log("Editing entry("+newVideogame.ID+")...")
            response = await GameDAOService.put('/videogames',newVideogame);
        }
        else{
            console.log("Adding entry...")
            response = await GameDAOService.post('/videogames',newVideogame);
        }
        console.log(response.data);
        navigate('/Games');
    }
    
    // Cancel Method
    const handleCancel = () =>{
        navigate('/');
    }

    return (
        <div className="container">
            <h1>{game.Title || "Create a Game"}</h1>
            <form onSubmit={formSubmit}>
                {/* Fields */}
                <div className="form-group">
                    <label htmlFor="title">Game Title</label>
                    <input className="form-control"
                        type="text"
                        id="title"
                        placeholder="Enter Title"
                        onChange={(e)=>updateField("Title", e.target.value)}
                        value={game.Title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="developer">Game Developer</label>
                    <input className="form-control"
                        type="text"
                        id="developer"
                        placeholder="Enter Developer"
                        onChange={(e)=>updateField("Developer", e.target.value)}
                        value={game.Developer}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Game Rating</label>
                    <select className="form-control"
                        id="rating"
                        placeholder="Select Rating"
                        onChange={(e)=>updateField("Rating", e.target.value)}
                        value={game.Rating}
                    >
                        <option value="EC">EC</option>
                        <option value="E">E</option>
                        <option value="E10">E10</option>
                        <option value="T">T</option>
                        <option value="M">M</option>
                        <option value="AO">AO</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Game Price</label>
                    <input className="form-control"
                        type="number"
                        id="price"
                        placeholder="Enter Price"
                        onChange={(e)=>updateField("Price", e.target.value)}
                        value={game.Price}
                    />
                </div>
                {/* Submit Button */}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default GameForm;
