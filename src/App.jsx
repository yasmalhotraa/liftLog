import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkoutPage from "./pages/WorkoutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
