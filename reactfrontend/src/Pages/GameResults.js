
import {useEffect,useState} from 'react';
import React from 'react'
import "../Styling/GameResults.css"
import GameTuple from '../Components/gametuple';
import TimeLine from '../Components/timeline';

function GameResults() {
    const [newGame, setNewGame] = useState([]);

    /*dynamically add useState variables containing related games
      doesn't work for some reason*/
    function setData(game) {
        console.log(game)
        setNewGame([...newGame, 
            game.title
        ])
        console.log(newGame)
    };  

    /*only run this once, GET request for the gameresults*/
    useEffect(() => {
        let url = new URL(window.location.href.toString());
        let search_params = url.searchParams;
        let basicSearch = search_params.get('title')
        const path = "http://localhost:5000/gameresults?title=" + basicSearch;
        fetch(path).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                var game = data.results;
                game.map((Object, i) => {
                    console.log(i);
                    console.log(Object.title);
                    setData(Object)
                    //another method I tried to dynamically add useState variables
                    //setNewGame([...newGame, { game: Object }])
                    //const {name,value} = Object;
                    //const list = [...newGame];
                    //list[i][name] = value;
                    //setNewGame(list);
                });
            }
        ));
    }, []);


    return (
        <div className="GameResults">
            <div className="GR-header">
                Game Name
            </div>
            <div className="GR-body">
                <li>   
                    <GameTuple>
                        Game
                    </GameTuple>
                </li>
                <li>
                    <GameTuple>
                        Game 1
                    </GameTuple>
                </li>
                <li>
                    <GameTuple>
                        Game 2
                    </GameTuple>
                </li>
                <li>
                    <GameTuple>
                        Game 3
                    </GameTuple>
                </li>
                <li>
                    <GameTuple>
                        Game 4
                    </GameTuple>
                </li>
                <li>
                    <GameTuple>
                        Game 5
                    </GameTuple>
                </li>
            </div>
            <TimeLine></TimeLine>
        </div>
    )
}

export default GameResults;