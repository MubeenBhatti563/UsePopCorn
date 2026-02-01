import React, { useState } from "react";

const TextCollapse = ({ color, collapseNum }) => {
  const [collapse, setCollapse] = useState(true);
  const text =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta sequivelit ducimus architecto minus illo nobis voluptatem tempora repudiandae ullam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, sunt.";
  const collap = collapse
    ? text.split(" ").slice(0, collapseNum).join(" ")
    : text;
  return (
    <div>
      <div style={{ color: "white" }}>{collap}</div>
      <span
        onClick={() => setCollapse(!collapse)}
        style={{ color: color, cursor: "pointer" }}
      >
        {collapse ? "Show more" : "Show less"}
      </span>
    </div>
  );
};

export default TextCollapse;
