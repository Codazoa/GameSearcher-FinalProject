import React, { useState } from "react";
import "../Styling/SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useNavigate } from 'react-router-dom';

function SearchBar({ placeholder }) {
  let navigate = useNavigate();
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };

  const clearInput = () => {
    setWordEntered("");
  };

  const checkEnter = (event) => {
    const x = event.which
    if(x == 13) {
      /* export query */
      navigate("/searchresults")
    } 
  };

  const check = () => {
    console.log("g");
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          onKeyPress={checkEnter}
        />
        <div className="searchIcon">
          {wordEntered.length === 0 ? (
            <SearchIcon id="searchBtn" />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
        <div className="advancedSearchIcon">
          <MoreHorizIcon id="advBtn" onClick={
            <div className="dataResult">
            return (
              <a className="dataItem">
                <p>hello</p>
              </a>
            )
            </div>} 
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;