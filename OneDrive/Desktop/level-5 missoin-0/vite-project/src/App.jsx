import "./App.css";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/homepage" element={<Homepage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
