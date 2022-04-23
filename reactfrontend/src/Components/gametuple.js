import "../Styling/GameResults.css"
import {useRef,useEffect,useState} from 'react';


export default function GameTuple(props) {
  const [isVisible, setVisible] = useState(true);

  const Games = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting))
    });

    observer.observe(Games.current);

    return () => observer.unobserve(Games.current);
  }, []);

  return (
    <div ref={Games} className={`fade-in-section ${isVisible ? "is-visible" : ""}`}>
      {props.children}
    </div>
  );
}