import React, { useState } from "react";

const StarRating = ({ maxRating, children }) => {
  const [tempVal, setTempVal] = useState(0);
  return (
    <>
      <div style={{ color: "white", display: "flex", gap: "0.5em" }}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span
            style={{ color: i + 1 <= tempVal ? "yellow" : "white" }}
            onMouseEnter={() => setTempVal(i + 1)}
            onMouseLeave={() => setTempVal(i + 1)}
          >
            S{i + 1}
          </span>
        ))}
        {tempVal}
        <p style={{ marginLeft: "0.8em" }}>{maxRating}</p>
      </div>
      {children}
    </>
  );
};

export default StarRating;
