import React from "react";

const Input = React.forwardRef(({ placeholder, value, onChange, css, onKeyDown }, ref) => {
  const design =
    "text-center text-xl font-mono bg-gray-400 border border-gray-400 rounded-lg px-4 py-2 outline-0 shadow-inner";

  return (
      <input
        ref={ref}
        onKeyDown={onKeyDown}
        className={`${design} ${css}`}
        type="text"
        id="name"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
  );
});

export default Input;
