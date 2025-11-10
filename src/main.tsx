import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import InitialLoader from "./components/InitialLoader";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <InitialLoader>
      <App />
    </InitialLoader>
  );
} else {
  console.error("Root element not found");
}
