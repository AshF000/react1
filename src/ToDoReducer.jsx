import React, { useEffect, useReducer, useRef } from "react";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import Display from "./Components/Display";
import Input from "./Components/Input";
import Button from "./Components/Button";

const db = getDatabase();

const reducer = (state, action) => {
  switch (action.type) {
    case "load": {
      return {
        ...state,
        todos: action.payload,
      };
    }

    case "add": {
      return {
        ...state,
        inpVal: "",
    }
}
    // case "edit";
    // case "delete";
    case "showType":
      return { ...state, inpVal: action.payload };
    // case "console":
    //   return console.log(action.payload);
    default:
      return state;
  }
};

const ToDoReducer = () => {
    const inpRef = useRef(null)
  const [state, dispatch] = useReducer(reducer, { inpVal: "", todos: [] });

  useEffect(() => {
    const reducerTask = ref(db, "reducerTask");
    onValue(reducerTask, (snapshot) => {
      //   dispatch({ type: "load", payload: data });
      let temp = [];
      snapshot.forEach((e) => {
        let a = {
          key: e.key,
          task: e.val().task,
        };
        temp.push(a);
        //   console.log(e.val().task);
      });
      dispatch({ type: "load", payload: temp });
    });
  }, []);

  const handleAdd = () => {
    let newTask = state.inpVal.trim();
    if (!(newTask == "")) {
      set(push(ref(db, "reducerTask")), {
        task: newTask,
      }).then(console.log("dhukse"));
    }
    dispatch({ type: "add", payload: inpRef});
    inpRef.current.focus()
  };

  return (
    <div className="bg-emerald-100 py-2">
      <p className="text-center font-bold text-2xl">
        To Do with useReducer Section
      </p>

      <div className="p-3 mx-auto my-4 shadow-custom w-9/12 flex flex-col justify-center items-center">
        <div className="w-4/12 flex justify-evenly items-center mb-4">
          <Input
ref={inpRef}
            value={state.inpVal}
            onChange={(e) => {
              dispatch({ type: "showType", payload: e.target.value });
            }}
          />
          <Button
            css={"bg-white"}
            work={"Add"}
            onClick={() => {
              handleAdd();
            }}
          />
        </div>
        <Display
          css={"w-3/12 aspect-square"}
          msg={
            <ul>
              {state.todos.map((todo) => (
                <li key={todo.key}>{todo.task}</li>
              ))}
            </ul>
          }
        />
      </div>
    </div>
  );
};

export default ToDoReducer;
