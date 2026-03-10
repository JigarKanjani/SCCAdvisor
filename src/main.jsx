import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SCCAdvisor from "./SCCAdvisor.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SCCAdvisor />
  </StrictMode>
);
