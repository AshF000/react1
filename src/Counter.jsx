import React, { useEffect, useState } from "react";
import Display from "./Components/Display";
import Button from "./Components/Button";

const Counter = () => {
  const [curr, setCurr] = useState(+localStorage.getItem("curr") || 0);
  useEffect(() => {
    localStorage.setItem("curr", curr.toString());
  }, [curr]);

  return (
    <div className="bg-emerald-100 py-2">
      <p className="text-center font-bold text-2xl">Counter Section</p>

      <div className="p-3 mx-auto my-4 shadow-custom w-9/12 flex flex-col justify-center items-center">
        <Display
          msg={curr}
          css={"w-1/12 aspect-square bg-white text-4xl flex mb-4 "}
        />
        <div className=" flex justify-between items-center w-3/12">
          <Button
            css={"bg-white "}
            work={"-1"}
            onClick={() => {
              setCurr(curr - 1);
            }}
          />
          <Button
            css={"bg-white "}
            work={"Clear"}
            onClick={() => {
              setCurr(0);
            }}
          />
          <Button
            css={"bg-white "}
            work={"+1"}
            onClick={() => {
              setCurr(curr + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Counter;
