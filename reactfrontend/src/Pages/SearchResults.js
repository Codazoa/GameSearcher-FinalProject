import React from "react";
import "../Styling/SearchResults.css";
import SearchBar from "../Components/searchbar";
import Tuple from "../Components/tuple";
import { useNavigate } from 'react-router-dom';

function SearchResults() {
    let navigate = useNavigate();
    const gamefound = () => {
        navigate("/gameresults")
    };

    return (
        <div className="SearchResults">
            <header className="SR-header">
                <p>
                    Results for....
                </p>
                <SearchBar placeholder="Enter a Game..." />
                <header className="SR-body">
                    <Tuple />
                    <Tuple />
                    {/* call function to display tuples */}
                </header>
                <header className="SR-body">
                    <Tuple />
                    <Tuple />
                </header>
                <header className="SR-body">
                    <Tuple />
                    <Tuple />
                </header>
                <header className="SR-body">
                    <Tuple />
                    <Tuple />
                </header>
                <header className="SR-body">
                    <Tuple />
                    <Tuple />
                </header>
            </header>
        </div>
    )
}

export default SearchResults;