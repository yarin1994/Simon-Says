import MainPage from "./pages/MainPage";
import Popup from "./components/Popup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/Game" element={<MainPage />} />
            <Route path="/" element={<Popup />} />
          </Routes>
        </Router>
        {/* <MainPage /> */}
      </header>
    </div>
  );
}

export default App;
