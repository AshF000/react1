import React, { Fragment, useReducer } from "react";
import Display from "./Components/Display";
import Button from "./Components/Button";

const reducer = (state, action) => {
  try {
    switch (action.type) {
      case "inc":
        return { ...state, count: state.count + state.inc };
      case "dec":
        return { ...state, count: state.count - state.inc };
      case "toInc":
        return { ...state, inc: state.inc+ 1 };
      case "toDec":
        console.log(history)
        return { ...state, inc: state.inc - 1 };
      case "reset":
        return { ...state, count:0 };
      default:
        return state;
    }
  } catch (e) {
    console.log(e);
    return state;
  }
};

const CounterReducer = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0,inc: 0 });

  return (
    <div className="bg-lime-100 py-2">
      <p className="text-center font-bold text-2xl"> Counter with useReducer Section</p>
      <div className="p-3 mx-auto my-4 shadow-custom w-9/12 flex justify-evenly items-center">
        <div className="w-5/12 flex flex-col justify-center items-center ">
        <h3>Change {state.inc}</h3>
          <Display
            msg={state.count}
            css={"w-2/12 aspect-square bg-white text-4xl flex mb-4 "}
          />
          <div className=" flex justify-between items-center w-4/12">
            <Button
              onClick={() => {
                dispatch({ type: "dec" });
              }}
              work={`- ${state.inc}`}
              css={"bg-white"}
            />
            <Button
              onClick={() => {
                dispatch({ type: "inc" });
              }}
              work={`+ ${state.inc}`}
              css={"bg-white"}
            />
          </div>
        </div>

        <Button work={"Reset"} onClick={()=>{dispatch({type: "reset"})}} css={"bg-white"}/>

        <div className="w-5/12 flex flex-col justify-center items-center ">
        <h3>how much you want to increase</h3>
          <Display
            msg={state.inc}
            css={"w-2/12 aspect-square bg-white text-3xl flex mb-4 "}
          />
          <div className=" flex justify-between items-center w-4/12">
            <Button
              onClick={() => {
                dispatch({ type: "toInc", history });
              }}
              work={"+"}
              css={"bg-white"}
            />
            <Button
              onClick={() => {
                dispatch({ type: "toDec" });
              }}
              work={"-"}
              css={"bg-white"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterReducer;
