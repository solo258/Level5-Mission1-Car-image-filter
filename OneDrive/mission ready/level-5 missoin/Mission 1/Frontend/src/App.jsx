import "./App.css";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form />}></Route>
      </Routes>
    </div>
  );
}

export default App;
