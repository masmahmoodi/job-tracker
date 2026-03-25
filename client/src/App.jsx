import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import NewApplicationPage from "./pages/NewApplicationPage.jsx";
import EditApplicationPage from "./pages/EditApplicationPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/applications" replace />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/create" element={<NewApplicationPage />} />
          <Route path="/applications/:id/edit" element={<EditApplicationPage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
