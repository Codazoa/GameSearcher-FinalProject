import { FastRewindRounded, Timeline } from '@material-ui/icons';
import {useRef,useEffect,useState} from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../Styling/GameResults.css"
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';
import GameTuple from '../Components/gametuple';
import TimeLine from '../Components/timeline';

function GameResults() {
    let navigate = useNavigate();

    
    return (
        <div className="GameResults">
            <div className="GR-header">
                Game Name
            </div>
            <div className="GR-body">
                <li>   
                    <GameTuple>
                        <div className='gametitle'>Game</div>
                        <div className='gamepicture'>picture</div>
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