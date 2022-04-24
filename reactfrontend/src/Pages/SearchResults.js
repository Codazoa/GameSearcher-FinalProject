import React, { useEffect, useState, useRef } from "react";
import "../Styling/SearchResults.css";
import SearchBar from "../Components/searchbar";
import Tuple from "../Components/tuple";
import { useLocation, useNavigate, createSearchParams} from 'react-router-dom';

function SearchResults() {
    const [search, setSearch] = useState("")
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
                console.log(data);
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
        var yay = 'hello'

        isMounted.current = false;
    }, []);

    /*
    function handleNewPage(page) {
        console.log(page)
    }
    */

    const gameFound = () => {
        navigate({pathname:'/gameresults', search: `?${createSearchParams({title: 'Dr. Mario'})}`});
    }

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
                            <div id="tuplebtn" onClick={gameFound}>{tuple1.title}</div>
                            <img src={tuple1.image} className="tupleimage"  alt="gamepic" />
                            <div>Consoles: {tuple1.console}</div>
                        </div>
                    </div>
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn">{tuple2.title}</div>
                            <img src={tuple2.image} className="tupleimage"  alt="gamepic" />
                            <div>{tuple2.console}</div>
                        </div>
                    </div>
                    {/* call function to display tuples */}
                </header>
                <header className="SR-body">
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn">{tuple3.title}</div>
                            <img src={tuple3.image} className="tupleimage"  alt="gamepic" />
                            <div>{tuple3.console}</div>
                        </div>
                    </div>
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn">{tuple4.title}</div>
                            <img src={tuple4.image} className="tupleimage"  alt="gamepic" />
                            <div>{tuple4.console}</div>
                        </div>
                    </div>
                </header>
                <header className="SR-body">
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn">{tuple5.title}</div>
                            <img src={tuple5.image} className="tupleimage"  alt="gamepic" />
                            <div>{tuple5.console}</div>
                        </div>
                    </div>
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn">{tuple6.title}</div>
                            <img src={tuple6.image} className="tupleimage"  alt="gamepic" />
                            <div>{tuple6.console}</div>
                        </div>
                    </div>
                </header>
                <header className="SR-body">
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn">{tuple7.title}</div>
                            <img src={tuple7.image} className="tupleimage"  alt="gamepic" />
                            <div>{tuple7.console}</div>
                        </div>
                    </div>
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn">{tuple8.title}</div>
                            <img src={tuple8.image} className="tupleimage"  alt="gamepic" />
                            <div>{tuple8.console}</div>
                        </div>
                    </div>
                </header>
                <header className="SR-body">
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn">{tuple9.title}</div>
                            <img src={tuple9.image} className="tupleimage"  alt="gamepic" />
                            <div>{tuple9.console}</div>
                        </div>
                    </div>
                    <div className="tuples">
                        <div className="tuplestext">
                            <div id="tuplebtn">{tuple10.title}</div>
                            <img src={tuple10.image} className="tupleimage"  alt="gamepic" />
                            <div>{tuple10.console}</div>
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