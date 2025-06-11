import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PrivateLayout from "./layouts/PrivateLayout";
import { ToastContainer } from "react-toastify";
import DashBoard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./contexts/AuthContext"; // BURADA EKLENMİŞ
import Register from "./pages/auth/Register";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import EmailVerificationNotice from "./pages/auth/EmailVerificationNotice";
import VerifyAccount from "./pages/auth/VerifyAccount";
import { useEffect } from "react";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("authToken");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/kayit" element={<Register />} />
          <Route path="/auth/verify" element={<VerifyEmailPage />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route
            path="/eposta-dogrulama"
            element={<EmailVerificationNotice />}
          />
          <Route path="/dogrula" element={<VerifyAccount />} />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <PrivateLayout>
                  <Routes>
                    <Route path="/ana-sayfa" element={<DashBoard />} />
                  </Routes>
                </PrivateLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
