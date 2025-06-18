import React, { useState } from "react";
import Display from "./Components/Display";
import Button from "./Components/Button";
import Input from "./Components/Input";

const ColorPicker = () => {
  const [displayBg, setDisplayBg] = useState("bg-white");
  const [inp, setInp] = useState("");

  const handleShowColor = () => {
    let trimmed = inp.trim();

    !trimmed.startsWith("#") ? (trimmed = "#" + trimmed) : "";

    setInp(trimmed);

    setDisplayBg(`bg-[${trimmed}]`);
    // setDisplayBg(`bg-[#903050]`);
  };

  return (
    <div className="bg-blue-100 py-2">
      <p className="text-center font-bold text-2xl">Color Checking Section</p>

      <div className="p-3 mx-auto my-4 shadow-custom w-9/12">
        <div className="w-7/12 mx-auto flex flex-col justify-center items-center">
          <div className="flex justify-around items-center mb-3 w-7/12">
            <Input
              value={inp}
              placeholder={"Enter HEX Code"}
              onChange={(e) => {
                setInp(e.target.value);
              }}
              css={"bg-white border-none"}
            />
            <Button
              work={"Enter"}
              css={`bg-white`}
              onClick={() => {
                handleShowColor();
              }}
            />
          </div>
          <Display css={`w-5/12 aspect-square mb-3 ${displayBg}`} />
          <div className="flex justify-around w-7/12">
            <Button
              work={"RED"}
              css={"bg-red-300 hover:bg-red-500"}
              onClick={() => {
                setDisplayBg("bg-red-500");
              }}
            />
            <Button
              work={"GREEN"}
              css={"bg-green-300 hover:bg-green-500"}
              onClick={() => {
                setDisplayBg("bg-green-500");
              }}
            />
            <Button
              work={"BLUE"}
              css={"bg-blue-300 hover:bg-blue-500"}
              onClick={() => {
                setDisplayBg("bg-blue-500");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
