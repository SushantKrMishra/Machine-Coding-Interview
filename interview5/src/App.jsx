import { useEffect, useState } from "react";
import "./App.css";

// eslint-disable-next-line react/prop-types
const ProgressBar = ({ progress }) => {
  const [animateSetup, setAnimateSetup] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimateSetup(progress), 500);
  }, [progress]);
  return (
    <div className="outer">
      <div
        className="inner"
        style={{ transform: `translateX(${animateSetup - 100}%)` }}
      >
        {progress}%
      </div>
    </div>
  );
};

function App() {
  const [data] = useState([1, 5, 10, 15, 25, 35, 45, 55, 65, 75, 85, 100]);
  return (
    <>
      <h1>Progress Bar</h1>
      {data.map((e) => (
        <ProgressBar key={e} progress={e} />
      ))}
    </>
  );
}

export default App;
