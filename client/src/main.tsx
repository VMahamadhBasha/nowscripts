import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import Auth from "./contexts/Auth";
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Auth>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Auth>
    </QueryClientProvider>
  </BrowserRouter>
);
