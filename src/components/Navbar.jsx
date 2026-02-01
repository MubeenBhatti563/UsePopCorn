import { useRef } from "react";
import useKey from "./hooks/useKey";

const Navbar = ({ query, setQuery, moviesCount }) => {
  const inputEl = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <nav className="navbar-class">
      <div className="logo">
        <span className="icon">🍿</span>
        <h3 className="logo-head">usePopcorn</h3>
      </div>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        className="search"
        placeholder="Search movies..."
        ref={inputEl}
      />
      <div className="results-size">
        Found <strong>{moviesCount}</strong> results
      </div>
    </nav>
  );
};

export default Navbar;
