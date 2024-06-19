import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer'; // Importa el componente Footer
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';


import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';



// PARA INICIALIZAR:
// - PRIMERO LEVANTAR BACKEND CON NODE INDEX.JX

// EN ESTE PROYECTO:
// - NPM INSTALL
// - NPM START

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <ToastProvider>
      <AuthProvider>
          <Router>
            <div>
              <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />            
                </Routes>
            </div>
            <Footer /> {/* Agrega el componente Footer al final de tu aplicación */}
          </Router>
      </AuthProvider>
    </ToastProvider>

  );
}

export default App;