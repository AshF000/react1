import React, { useEffect, useRef, useState } from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import FirebaseError from "./firebase.config";

import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

const ToDo = () => {
  const db = getDatabase();
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const [todoList, setTodoList] = useState([]);
  const [inpVal, setInpVal] = useState("");
  const [todoAdded, setTodoAdded] = useState(true);
  const [edit, setEdit] = useState(false);
  const [modalVal, setModalVal] = useState("");
  const [idToBeEdited, setIdToBeEdited] = useState("")

  useEffect(() => {
    // onValue
    const todoRef = ref(db, "tasks");
    onValue(todoRef, (e) => {
      // const s = e
      let temp = [];
      e.forEach((i) => {
        let tempObj = {
          id: i.key,
          task: i.val().task,
        };
        temp.push(tempObj);
      });
      setTodoList(temp);
    });
  }, [todoAdded]);

  const handleAddTodo = () => {
    let a = inpVal.trim();
    if (a !== "") {
      setTodoList([...todoList, a]);
      setInpVal("");
      inputRef.current.focus();
      set(push(ref(db, "tasks/")), {
        task: a,
      }).then(setTodoAdded(!todoAdded));
    }
  };

  const openModal = (e) => {
    setIdToBeEdited(e.id)
    setEdit(true);
    setModalVal(e.task);
  };

  const handleEditTodo = (e, v) => {
    console.log(e.id);
    console.log(v);

    const todoRef = ref(db, "tasks/" + e.id);
    update(todoRef, {task: v})
    .then(()=>{console.log("update hoise")})
    setEdit(false);
  };

  const handleRemoveTodo = (e) => {
    const todoRef = ref(db, "tasks/" + e);
    remove(todoRef);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  };

  return (
    <div className="bg-indigo-100 py-2">
      <p className="text-center font-bold text-2xl">ToDo Section</p>

      <div className="p-3 mx-auto my-4 shadow-custom w-9/12 flex  justify-evenly items-center">
        <div className="w-4/12 flex justify-evenly items-center">
          <Input
            ref={inputRef}
            value={inpVal}
            onKeyDown={handleKeyPress}
            onChange={(e) => {
              setInpVal(e.target.value);
            }}
          />
          <Button
            ref={buttonRef}
            onClick={() => {
              handleAddTodo();
            }}
            work={`Add`}
            css={`bg-white`}
          />
        </div>
        <div className=" w-4/12 bg-white shadow-custom p-2 rounded h-[180px] overflow-scroll">
          <ul className="list-disc ml-5">
            {todoList.map((todo) => (
              <div key={todo.id} className="relative flex justify-between">
                {edit && todo.id==idToBeEdited? (
                  <div
                    id="modal"
                    className="w-full h-full absolute top-0 left-0 bg-black flex !rounded-lg"
                  >
                    <div className="w-10/12 rounded">
                      <Input
                        ref={null}
                        value={modalVal}
                        onKeyDown={null}
                        onChange={(e) => {
                          setModalVal(e.target.value);
                        }}
                        css={`w-full h-full absolute !text-left !text-[14px] pl-1 py-1`}
                      />
                    </div>
                    <div className="flex justify-evenly w-2/12 z-10 items-center ">
                      <Button
                        onClick={() => {
                          handleEditTodo(todo, modalVal);
                        }}
                        work={`OK`}
                        css={`shadow-custom border border-blue-700 text-blue-700 !rounded-[50%] bg-white !p-0 !h-[18px] !w-[18px] text-[9px] font-bold`}
                      />
                      <Button
                        onClick={() => {
                          setEdit(false);
                        }}
                        work={`x`}
                        css={`shadow-custom border border-red-700 text-red-700 !rounded-[50%] bg-white !p-0 !h-[18px] !w-[18px] text-[10px] font-bold`}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <li>{`${todo.task}`}</li>
                <div className="flex w-2/12 justify-evenly">
                  <Button
                    onClick={() => {
                      openModal(todo);
                    }}
                    work={`/`}
                    css={`shadow-custom border border-blue-700 text-blue-700 !rounded-[50%] bg-white !p-0 !h-[18px] !w-[18px] text-[10px] font-bold`}
                  />
                  <Button
                    onClick={() => {
                      handleRemoveTodo(todo.id);
                    }}
                    work={`x`}
                    css={`shadow-custom border border-red-700 text-red-700 !rounded-[50%] bg-white !p-0 !h-[18px] !w-[18px] text-[10px] font-bold`}
                  />
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDo;

/*
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import db from "../firebase.config";
import Input from "./Components/Input";
import Button from "./Components/Button";

const ToDo = () => {
  const [todoList, setTodoList] = useState([]);
  const [inpVal, setInpVal] = useState("");

  // Fetch todos when page loads
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosRef = collection(db, "todos");
        const q = query(todosRef, orderBy("createdAt", "asc")); // or "desc" if you prefer
        const querySnapshot = await getDocs(q);
        const todos = querySnapshot.docs.map((doc) => doc.data().dos);
        setTodoList(todos);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const trimmed = inpVal.trim();
    if (trimmed === "") return;

    try {
      await addDoc(collection(db, "todos"), {
        dos: trimmed,
        createdAt: serverTimestamp(), // 🔥 important!
      });
      setInpVal("");

      const querySnapshot = await getDocs(collection(db, "todos"));
      const todos = querySnapshot.docs.map((doc) => doc.data().dos);
      setTodoList(todos);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <div className="bg-indigo-100 py-2">
      <p className="text-center font-bold text-2xl">ToDo Section</p>

      <div className="p-3 mx-auto my-4 shadow-custom w-9/12 flex justify-evenly items-center">
        <div className="w-4/12 flex justify-evenly items-center">
          <Input value={inpVal} onChange={(e) => setInpVal(e.target.value)} />
          <Button onClick={handleAddTodo} work={`Add`} css={`bg-white`} />
        </div>
        <div className="w-4/12 bg-white shadow-custom p-2 rounded h-[200px] overflow-scroll">
          <ul className="list-disc ml-5">
            {todoList.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
*/
