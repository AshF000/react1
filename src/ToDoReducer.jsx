import React, { useReducer, useRef } from "react";
import Display from "./Components/Display";
import Input from "./Components/Input";
import Button from "./Components/Button";
import Modal from "./Components/Modal";

const reducer = (r, action) => {
  switch (action.type) {
    case "inpChange":
      // console.log(action.payload)
      return {
        ...r,
        inpVal: action.payload,
      };

    case "entered":
      action.payload.key == "Enter" && action.payload.ref.current.click();
      return r;

    case "addTask":
      if (r.inpVal.trim() == "") return r;
      return {
        ...r,
        tasks: [...r.tasks, r.inpVal],
        inpVal: "",
      };

    case "modal":
      return {
        ...r,
        modalOn: true,
        toEdit: action.payload
      };

    case "notEdit":
      return {
        ...r,
        modalOn: false,
        toEdit: ""
      };

    case "edit":
      return {
        ...r,
        tasks: r.tasks.map((t, ind) =>
          ind === action.payload.i ? action.payload.e : t
        ),
        modalOn:false, 
        toEdit: ""
      };

    case "delete":
      return {
        ...r,
        tasks: r.tasks.filter((_, i) => i != action.payload),
      };
  }
};

const ToDoReducer = () => {
  const [state, dispatch] = useReducer(reducer, {
    inpVal: "",
    tasks: ["hia"],
    modalOn: false,
    toEdit:""
  });

  const btnRef = useRef(null);
  const inpRef = useRef(null);

  return (
    <div className="bg-emerald-100 py-2">
      <p className="text-center font-bold text-2xl">Video Section</p>

      <div className="p-3 mx-auto my-4 shadow-custom w-9/12 flex flex-col justify-center items-center">
        <div className="flex w-4/13 justify-between items-center mb-4">
          <Input
            ref={inpRef}
            onKeyDown={(e) => {
              dispatch({
                type: "entered",
                payload: { key: e.key, ref: btnRef },
              });
            }}
            onChange={(e) => {
              dispatch({ type: "inpChange", payload: e.target.value });
            }}
            value={state.inpVal}
            placeholder={"Add task"}
          />
          <Button
            onClick={() => {
              dispatch({ type: "addTask" });
            }}
            ref={btnRef}
            work={"Add"}
            css={"bg-white"}
          />
        </div>

        <Display
          msg={
            <ul className="list-decimal list-inside w-full">
              {state.tasks.map((todo, i) => (
                <li key={i} className="relative bg-white rounded-md my-2 py-1 w-full flex justify-between items-center shadow-custom px-2">
                  <span className="text-left block">{todo}</span>
                  <span className="flex items-center justify-evenly w-[25%]">
                    <Button
                      onClick={() => {
                        dispatch({ type: "modal", payload: i
                         });
                      }}
                      work={"/"}
                      css={
                        "bg-blue-500 text-white !text-[8px] !w-[18px] font-bold aspect-square !p-0 !rounded-[50%]"
                      }
                    />
                    <Button
                      onClick={() => {
                        dispatch({ type: "delete", payload: i });
                      }}
                      work={"X"}
                      css={
                        "bg-red-500 text-white !text-[8px] !w-[18px] font-bold aspect-square !p-0 !rounded-[50%]"
                      }
                    />
                  </span>
                  {state.modalOn && i==state.toEdit && (
                    <Modal
                      val={todo}
                      editDone={(e) => {
                        dispatch({ type: "edit", payload: { e: e, i: i } });
                      }}
                      modalOff={() => {
                        dispatch({ type: "notEdit" });
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          }
          css={"w-5/12 h-[16rem] bg-emerald-300 overflow-scroll"}
        />
      </div>
    </div>
  );
};

export default ToDoReducer;
