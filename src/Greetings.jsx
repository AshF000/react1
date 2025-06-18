import React, { useState } from "react";
import Display from "./Components/Display";
import Button from "./Components/Button";
import Input from "./Components/Input";

const Greetings = () => {
  const [inp, setInp] = useState("");
  const [usersName, setUsersName] = useState("User");
  const [greet, setGreet] = useState("");

  const handleGreet = () => {
    const now = new Date();
    const hour = now.getHours();

    setUsersName(inp);
    setInp("");

    setGreet(hour < 17 ? "Morning" : "Evening");
  };

  const msg = `Good${" " + greet}, ${usersName}.`;

  const handleInputChange = (e) => {
    setInp(e.target.value);
  };

  const trying = () => {
    console.log("Ashfiq");
  };

  return (
    <>
      <div className="bg-pink-200 py-2">
        <p className="text-center font-bold text-2xl">Greetings Section</p>

        <div className="p-3 mx-auto my-4 shadow-custom w-9/12">
          <Display msg={msg} css="w-6/12 text-2xl" />
          <Input value={inp} onChange={handleInputChange} placeholder={"Enter Name"} css={"w-6/12 mx-auto block mt-2 bg-white border-none"}/>
          <div className="flex flex-wrap w-6/12 justify-around mx-auto my-4 items-center">
            <Button work="Greet!" onClick={handleGreet} css={"w-[150px] my-2 bg-white hover:shadow-custom"}/>
            <Button work="Debug Console" onClick={trying} css={"w-[150px] my-2 bg-white"}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Greetings;