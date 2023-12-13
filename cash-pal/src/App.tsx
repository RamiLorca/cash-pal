import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Navigation from "./router/NavigationBar/NavigationBar.component";
import Home from "./router/Home.component";
import Settings from "./router/Settings.component";
import SignIn from "./router/SignIn/SignIn.component";
import { SuggestionsProvider } from "./context/SuggestionsContext";

import TransferWebSocketConfig from "./utilities/TransferWebSocketConfig";

const App = () => {
  return (
    <>
      <SuggestionsProvider>
        <TransferWebSocketConfig />
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
        </Routes>
      </SuggestionsProvider>
    </>
  );
};

export default App;
