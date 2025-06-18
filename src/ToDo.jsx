import React, { useEffect, useRef, useState } from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import FirebaseError from "./firebase.config";

import { getDatabase, ref, set, push, onValue } from "firebase/database";

const ToDo = () => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const [todoList, setTodoList] = useState([]);
  const [inpVal, setInpVal] = useState("");

  useEffect(() => {
    // onValue
    const db = getDatabase();
    const todoRef = ref(db, "tasks");
    onValue(todoRef, (e) => {
      // const s = e
      let temp = []
      e.forEach((e) => {
        temp.push(e.val().task)
      });
      setTodoList(temp);
    });
  }, []);

  const handleAddTodo = () => {
    let a = inpVal.trim();
    if (a !== "") {
      setTodoList([...todoList, a]);
      setInpVal("");
      inputRef.current.focus();
      const db = getDatabase();
      set(push(ref(db, "tasks/")), {
        task: a,
      });
    }
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
        <div className="w-4/12 bg-white shadow-custom p-2 rounded h-[180px] overflow-scroll">
          <ul className="list-disc ml-5">
            {todoList.map((todo, index) => (
              <li key={index}>{`${todo}`}</li>
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
