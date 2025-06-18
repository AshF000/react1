import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Greetings from "./Greetings.jsx";
import ColorPicker from "./ColorPicker.jsx";
import Counter from "./Counter.jsx";
import DynamicHeading from "./DynamicHeading.jsx";
import { FirebaseError } from "firebase/app";
import ToDo from "./ToDo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Greetings />
    <ColorPicker />
    <Counter />
    <DynamicHeading />
    <ToDo />
  </StrictMode>
);
