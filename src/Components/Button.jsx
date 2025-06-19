import React from "react";

const Button = React.forwardRef(({ work, onClick, css }, ref) => {
  const design =" text-black py-2 px-4 rounded-md transition duration-150 " + css;

  return (
    <>
      <button ref={ref} className={`${design}`} onClick={onClick}>
        {work}
      </button>
    </>
  );
});
export default Button;
