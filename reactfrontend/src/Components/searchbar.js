import React, { useEffect, useState, useRef } from "react";
import "../Styling/SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useNavigate, createSearchParams } from 'react-router-dom';

function SearchBar({ placeholder }) {
  let navigate = useNavigate();
  const [wordEntered, setWordEntered] = useState(""); //holds basic search word
  const [isVisible, setIsVisible] = useState(false);  //bool for opening adv search menu
  const [isChecked, setIsChecked] = useState(true);   //bool for type of search
  const [newKeyWord, setNewKeyWord] = useState([      //keeps track of keywords
    { keyWord: "" }
  ]);
  const [search, setIsSearch] = useState();           //to trigger the useeffect
  const isMounted = useRef(false);                    //to check where user is searching from
  
  /*runs useEffect whenever search changes
    isMounted is to ensure it doesn't run on the initial render
    The first navigate is for a search from the home screen
    and the second navigate is for a search from search results page*/
  useEffect(() => {
    if(isMounted.current) {
      
      if (window.location.pathname.toString() === '/') {
        navigate({pathname:'searchresults', search: `?${createSearchParams({
          search: wordEntered
        })}`});
      } else {
        navigate( {search: createSearchParams({search: wordEntered}).toString()});
        window.location.reload()
      }
    } else {
      isMounted.current = true;
    }
  }, [search]);

  /*stores and updates the user search text*/
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };

  /*clears input from search bar*/
  const clearInput = () => {
    setWordEntered("");
  };

  /*checks if the user searches by enter key*/
  const checkEnter = (event) => {
    const x = event.which
    if(x === 13) {
      handleSearch();
    } 
  };

  /*handles regular and adv searches, then navigates to game results*/
  const handleSearch = () => {
    setIsSearch(search + 1)
  }

  /*toggles the visibility of the advanced search menu*/
  const togglevis = () => {
    setIsVisible(!isVisible);
    setIsChecked(true);
  }

  /*toggles between conjunctive and disjunctive search*/
  const toggleTypeSearch = () => {
    setIsChecked(!isChecked);
  }

  /*handles keywords from adv search*/
  const handleNewKeyWord = () => {
    setNewKeyWord([...newKeyWord, { keyWord: ""}])
  }

  /*removes the most recently added keyword*/
  const handleRemoveKeyWord = (index) => {
    const list = [...newKeyWord];
    list.splice(index, 1);
    setNewKeyWord(list);
  }

  /*adds keyword to keyword list*/
  const handleKeyWords = (e, index) => {
    const {name, value} = e.target;
    const list = [...newKeyWord];
    list[index][name] = value;
    console.log(list[index])
    //setNewKeyWord(list);
    setNewKeyWord([...newKeyWord, 
      list
    ])
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
          <div className="advSearchOption">
            {newKeyWord.map((singleKeyWord, index) => (
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
            ))}
            <div className="advSearchOption">
              Consoles:
              <div className="center">
                <div>
                  Xbox
                  <input type="checkbox" />
                </div>
                <div>
                  Playstation
                  <input type="checkbox"/>
                </div>
                <div>
                  Nintendo
                  <input type="checkbox"/>
                </div>
              </div>
            </div>
            <div className="advSearchOption">
              <div>Type Search:
                <div className="center">
                  <div>  
                    Conjunctive <input type="checkbox" checked={isChecked} onChange={toggleTypeSearch} />
                  </div>
                  <div>
                    Disjunctive <input type="checkbox" checked={!isChecked} onChange={toggleTypeSearch} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default SearchBar;