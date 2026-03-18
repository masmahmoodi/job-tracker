import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import NewApplicationPage from "./pages/NewApplicationPage.jsx";
import EditApplicationPage from "./pages/EditApplicationPage.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/applications" replace />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/create" element={<NewApplicationPage />} />
          <Route path="/applications/:id/edit" element={<EditApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
