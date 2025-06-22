import React from "react";

const Display = ({ msg, css}) => {
  const design =
    "mx-auto  p-4 border border-gray-300 rounded-xl shadow-md text-center font-medium items-center justify-center";

  return (
      <div className={`${design} ${css}`}>
        <span>
          {msg}
          </span>
      </div>
  );
};

export default Display;
