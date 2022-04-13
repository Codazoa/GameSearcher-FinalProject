import React, { useState } from "react";
import "../Styling/SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useNavigate } from 'react-router-dom';

function SearchBar({ placeholder }) {
  let navigate = useNavigate();
  const [wordEntered, setWordEntered] = useState("");
  const [keyWordEntered, setKeyWordEntered] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [newKeyWord, setNewKeyWord] = useState([
    { keyWord: "" }
  ]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };

  const advhandleFilter = (event) => {
    const searchWord = event.target.value;
    setKeyWordEntered(searchWord);
  };

  const clearInput = () => {
    setWordEntered("");
  };

  const checkEnter = (event) => {
    const x = event.which
    if(x === 13) {
      /* export query */
      navigate("/searchresults");
    } 
  };

  const togglevis = () => {
    setIsVisible(!isVisible);
    setIsChecked(true);
  }

  const toggleTypeSearch = () => {
    setIsChecked(!isChecked);
  }

  const handleNewKeyWord = () => {
    setNewKeyWord([...newKeyWord, { keyWord: ""}])
  }

  const handleRemoveKeyWord = (index) => {
    const list = [...newKeyWord];
    list.splice(index, 1);
    setNewKeyWord(list);
  }

  const handleKeyWords = (e, index) => {
    const {name, value} = e.target;
    const list = [...newKeyWord];
    list[index][name] = value;
    setNewKeyWord(list);
  }

  return (
    <div>
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
            <MoreHorizIcon id="advBtn" onClick={togglevis}
            />
          </div>
        </div>
      </div>
      {isVisible &&
        <div className="advSearchMenu">
        <div className="advSearchHeader">Advanced Search Options</div>
          <div className="advSearchText">
            {newKeyWord.map((singleKeyWord, index) => (
              <div>
                <div>Keyword: 
                  <div className="advsearch">
                    <div className="advsearchInputs">
                      <input
                        type="text"
                        value={singleKeyWord.newKeyWord}
                        onChange={(e) => handleKeyWords(e, index)}
                      />
                      <div className="newKeyBtn">
                        {(newKeyWord.length - 1 === index) && (newKeyWord.length > 1) && (
                          <button 
                            className="newKeyBtnStyle" 
                            id="newKeyBtnStyle" 
                            onClick={() => handleRemoveKeyWord(index)}
                          >
                            Remove Keyword
                          </button>
                        )}
                      </div>
                      <div className="newKeyBtn">
                        {(newKeyWord.length - 1 === index) && (newKeyWord.length < 4) && (
                          <button 
                            className="newKeyBtnStyle" 
                            id="newKeyBtnStyle" 
                            onClick={handleNewKeyWord}
                          >
                            New Keyword
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="typeSearch">
              Consoles
              <div className="center">
                <label>
                  Xbox:
                  <input type="checkbox" />
                </label>
                <label>
                  Playstation:
                  <input type="checkbox"/>
                </label>
                <label>
                  Nintendo:
                  <input type="checkbox"/>
                </label>
              </div>
            </div>
            <div className="typeSearch">
              <label>  
                Conjunctive: <input type="checkbox" checked={isChecked} onChange={toggleTypeSearch} />
              </label>
              <label>
                Disjunctive: <input type="checkbox" checked={!isChecked} onChange={toggleTypeSearch} />
              </label>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default SearchBar;