import logo from '../Pictures/logos.png';
import React from "react";
import "../Styling/App.css";
import SearchBar from "../Components/searchbar";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Game Searcher!
          </p>
        <SearchBar placeholder="Enter a Game..." />
      </header>
    </div>
  );
}

export default Home;