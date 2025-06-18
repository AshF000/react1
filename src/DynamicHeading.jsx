import React, { useState } from "react";
import Display from "./Components/Display";
import Input from "./Components/Input";
import Button from "./Components/Button";

const DynamicHeading = () => {
  const [inpVal, setInpVal] = useState("");
  return (
    <div className="bg-fuchsia-100 py-2">
      <p className="text-center font-bold text-2xl">Dynamic Heading Section</p>

      <div className="p-3 mx-auto my-4 shadow-custom w-9/12 flex flex-col justify-center items-center">
        <Display msg={inpVal||"Type Something Below"} css={"bg-white w-4/12 py-2 text-2xl mb-4"} />
        <div className="w-4/12 flex justify-between items-center">
          <Input
          placeholder={"type here"}
            css={``}
            value={inpVal}
            onChange={(e) => {
              setInpVal(e.target.value);
            }}
          />
          <Button work={`Clear`} css={`bg-white shadow-custom`} onClick={()=>{setInpVal("")}} />
        </div>
      </div>
    </div>
  );
};

export default DynamicHeading;
