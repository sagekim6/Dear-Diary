import "./style/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h2>App 페이지</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
