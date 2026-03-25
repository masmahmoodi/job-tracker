import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import NewApplicationPage from "./pages/NewApplicationPage.jsx";
import EditApplicationPage from "./pages/EditApplicationPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/applications" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/create"
          element={
            <ProtectedRoute>
              <NewApplicationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/:id/edit"
          element={
            <ProtectedRoute>
              <EditApplicationPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
