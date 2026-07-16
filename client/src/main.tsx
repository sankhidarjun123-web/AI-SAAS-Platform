import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App";
import { store } from "./store/store";

const publishKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ClerkProvider publishableKey={publishKey}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ClerkProvider>
    </BrowserRouter>
  </Provider>
);