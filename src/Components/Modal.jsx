import React from "react";
import Input from "./Input";
import Button from "./Button";
import { useReducer, } from "react";

const reducer = (state, action)=>{
  switch(action.type){
    case "inpVal":
      return{
        ...state,
        inpVal: action.payload,
      }

  }
}

const Modal = ({ inpRef, modalOff, editDone, val }) => {

  const [state, dispatch] = useReducer(reducer, {newTask: "", inpVal: val})
  
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 rounded-lg opacity-100">
      <div className="flex justify-between items-center rounded-lg h-full px-2">
        <Input
          ref={inpRef}
          onKeyDown={(e)=>{console.log(e.key=="Enter")}}
          onChange={(e)=>{dispatch({type: "inpVal", payload: e.target.value})}}
          value={state.inpVal}
          placeholder={"Edit your task"}
          css={"bg-white border-0 w-[75%] !text-left !text-[14px] !px-0 !py-1"}
        />
        <div className="w-[25%] flex justify-evenly items-center">
          <Button onClick={()=>{editDone(state.inpVal)}} work={"="} css={"bg-blue-500 text-white !text-[10px] !w-[18px] font-bold aspect-square !p-0 !rounded-[50%]"} />
          <Button onClick={modalOff} work={"x"} css={"bg-red-500 text-white !text-[10px] !w-[18px] font-bold aspect-square !p-0 !rounded-[50%]"} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
