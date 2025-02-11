import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!text.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    const query = text.toLowerCase().trim();
    const cachedData = sessionStorage.getItem(query);

    if (cachedData) {
      setResults(JSON.parse(cachedData));
      setError(null);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      fetch("https://dummyjson.com/recipes/search?q=" + query)
        .then((res) => res.json())
        .then((res) => {
          setResults(res.recipes);
          sessionStorage.setItem(query, JSON.stringify(res.recipes));
          setError(null);
        })
        .catch(() => {
          setError("Failed to fetch recipes. Please try again.");
        });
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text]);

  return (
    <div className="App">
      <section className="input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search recipes..."
        />
      </section>
      {error && <p className="error-message">{error}</p>}
      {text && results.length > 0 && (
        <section className="result-container">
          {results.map((item, index) => (
            <span key={index} className="result-item">
              {item.name}
            </span>
          ))}
        </section>
      )}
    </div>
  );
}

export default App;
