import "../Styling/SearchResults.css";
import { useNavigate } from 'react-router-dom';

function Tuple() {
    let navigate = useNavigate();
    const gamefound = () => {
        navigate("/gameresults")
    };

    return (
        <div className="tuples">
            <div className="tuplestext">
                <p id="tuplebtn" onClick={gamefound}>Game Name</p>
                <p>Image</p>
                <p>Console List</p>
            </div>
        </div>
    )
};

export default Tuple