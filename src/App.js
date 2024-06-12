import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

import { AuthProvider } from './contexts/AuthContext';


// PARA INICIALIZAR:
// - PRIMERO LEVANTAR BACKEND CON NODE INDEX.JX

// EN ESTE PROYECTO:
// - NPM INSTALL
// - NPM START


function App() {
  return (
    <AuthProvider>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
    </AuthProvider>

  );
}

export default App;