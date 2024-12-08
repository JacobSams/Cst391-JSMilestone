import React, { useEffect, useState } from "react";
import {Routes, BrowserRouter, Route, useLocation} from 'react-router-dom';
import GameDAOService from "../../services/GameDAOService";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import GameList from "../GameList/GameList";
import GameForm from "../GameForm/GameForm";

const AppContent =() => {

    // VIDEO GAME LIST
    const [gameList, setGameList] = useState([]);
    
    const loadGames = async () => {
        try{
        const response = await GameDAOService.get('/videogames');
        setGameList(response.data);
        } catch(error){
            console.error(error);
        }
    }
    
    // Allows list to refresh whenever list page is navigated to
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname === "/Games"){
            loadGames()
        }
    },[location.pathname])

    return (
        <>
            <Navbar/>
            <Routes>
                {/* Home Page */}
                <Route exact path="/"
                    element={<Home/>}/>
                {/* Game List */}
                <Route exact path ="/Games"
                    element={<GameList games={gameList}/>}/>
                {/* Game Form */}
                <Route exact path='/New'
                    element={<GameForm editing={false}/>}/>
                <Route exact path='/Edit/:vgID'
                    element={<GameForm editing={true}/>}/>
            </Routes>
        </>
    )
}

const App = () =>{return(
    <BrowserRouter>
        <AppContent/>
    </BrowserRouter>
)}

export default App;