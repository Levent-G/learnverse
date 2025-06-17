import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import PrivateLayout from "./layouts/PrivateLayout";
import { privateRoutes, publicRoutes } from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("authToken");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <PrivateLayout>
                  <Routes>
                    {privateRoutes.map(({ path, element }) => (
                      <Route key={path} path={path} element={element} />
                    ))}
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
