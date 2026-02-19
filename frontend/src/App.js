import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AbmInterno from "./pages/AbmInterno";
import Carrito from "./pages/Carrito";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import PanelInterno from "./pages/PanelInterno";








function App() {
  const { user, login, logout } = useAuth();

  return (
    <Router>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Home onLogin={login} user={user} />} />
        <Route path="/abm" element={<AbmInterno onLogin={login} />} /> 
        
        
        <Route
          path="/abm-interno"
          element={
            <ProtectedRoute user={user}>
               <PanelInterno />
            </ProtectedRoute>
          }
        />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Router>
  );
}

export default App;


/*<Route path="/abm" element={<AbmInterno />} /> */ 