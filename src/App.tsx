import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RoutesWrapper } from "./routes/RoutesWrapper";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#a5805e",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RoutesWrapper />
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
