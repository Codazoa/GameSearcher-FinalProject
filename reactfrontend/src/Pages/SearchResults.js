import React, { useEffect, useState } from "react";
import "../Styling/SearchResults.css";
import SearchBar from "../Components/searchbar";
import {useNavigate, createSearchParams} from 'react-router-dom';

function SearchResults() {
    const [mount, isMounted] = useState(true);
    const [tuple1, setTuple1] = useState([]);
    const [tuple2, setTuple2] = useState([]);
    const [tuple3, setTuple3] = useState([]);
    const [tuple4, setTuple4] = useState([]);
    const [tuple5, setTuple5] = useState([]);
    const [tuple6, setTuple6] = useState([]);
    const [tuple7, setTuple7] = useState([]);
    const [tuple8, setTuple8] = useState([]);
    const [tuple9, setTuple9] = useState([]);
    const [tuple10, setTuple10] = useState([]);

    let navigate = useNavigate();

    // Using useEffect for single rendering
    useEffect(() => {
        let url = new URL(window.location.href.toString());
        let search_params = url.searchParams;
        let basicSearch = search_params.get('search')
        const path = "http://localhost:5000/searchresults?search=" + basicSearch;
        fetch(path).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setTuple1(data.results[0]);
                setTuple2(data.results[1]);
                setTuple3(data.results[2]);
                setTuple4(data.results[3]);
                setTuple5(data.results[4]);
                setTuple6(data.results[5]);
                setTuple7(data.results[6]);
                setTuple8(data.results[7]);
                setTuple9(data.results[8]);
                setTuple10(data.results[9]);
                
                
            })
        );

        isMounted.current = false;
    }, []);

    /*
    function handleNewPage(page) {
        console.log(page)
    }
    */

    const gameFound = (game) => {
        navigate({pathname:'/gameresults', search: `?${createSearchParams({title: game})}`});
    };

    return (
        <div className="SearchResults">
            <header className="SR-header">
                <p>
                    Results for...
                </p>
                <SearchBar placeholder="Enter a Game..." />
                <header className="SR-body">
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn" onClick={() => gameFound(tuple1.title)}>{tuple1.title}</div>
                            <img src={tuple1.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple1.console}</div>
                        </div>
                    </div>
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn" onClick={() => gameFound(tuple2.title)}>{tuple2.title}</div>
                            <img src={tuple2.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple2.console}</div>
                        </div>
                    </div>
                    {/* call function to display tuples */}
                </header>
                <header className="SR-body">
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn" onClick={() => gameFound(tuple3.title)}>{tuple3.title}</div>
                            <img src={tuple3.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple3.console}</div>
                        </div>
                    </div>
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn" onClick={() => gameFound(tuple4.title)}>{tuple4.title}</div>
                            <img src={tuple4.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple4.console}</div>
                        </div>
                    </div>
                </header>
                <header className="SR-body">
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn" onClick={() => gameFound(tuple5.title)}>{tuple5.title}</div>
                            <img src={tuple5.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple5.console}</div>
                        </div>
                    </div>
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn" onClick={() => gameFound(tuple6.title)}>{tuple6.title}</div>
                            <img src={tuple6.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple6.console}</div>
                        </div>
                    </div>
                </header>
                <header className="SR-body">
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn" onClick={() => gameFound(tuple7.title)}>{tuple7.title}</div>
                            <img src={tuple7.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple7.console}</div>
                        </div>
                    </div>
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn" onClick={() => gameFound(tuple8.title)}>{tuple8.title}</div>
                            <img src={tuple8.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple8.console}</div>
                        </div>
                    </div>
                </header>
                <header className="SR-body">
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn" onClick={() => gameFound(tuple9.title)}>{tuple9.title}</div>
                            <img src={tuple9.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple9.console}</div>
                        </div>
                    </div>
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn" onClick={() => gameFound(tuple10.title)}>{tuple10.title}</div>
                            <img src={tuple10.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple10.console}</div>
                        </div>
                    </div>
                </header>
                <div className="SR-footer">
                    {/*<div className="footer-text" onClick={handleNewPage(1)}>1</div>
                    <div className="footer-text" onClick={handleNewPage(2)}>2</div>
                    <div className="footer-text" onClick={handleNewPage(3)}>3</div>
                    <div className="footer-text" onClick={handleNewPage(4)}>4</div>
                    <div className="footer-text" onClick={handleNewPage(5)}>5</div>*/}
                </div>
            </header>
        </div>
    )
}

export default SearchResults;