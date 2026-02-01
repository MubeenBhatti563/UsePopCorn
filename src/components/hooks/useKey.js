import React, { useEffect } from "react";

const useKey = (key, action) => {
  useEffect(() => {
    function callback(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
};

export default useKey;
