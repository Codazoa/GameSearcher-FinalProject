import "./Styling/App.css";
import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResults";
import GameResults from "./Pages/GameResults";
import About from "./Pages/About";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/searchresults/*" element={<SearchResults />}/>
        <Route path="gameresults/*" element={<GameResults />}/>
      </Routes>
    </div>
  );
}

export default App;
