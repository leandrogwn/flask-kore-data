import NavbarComponent from './components/navbar/NavbarComponent'
import Home from './pages/home';
import Backend from './pages/sobre/backend';
import Frontend from './pages/sobre/frontend';
import Usuarios from './pages/usuarios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <NavbarComponent />

        <div className="container">
          <Routes>
            <Route path="/" index element={<Home />}></Route>
            <Route path="/usuarios" element={<Usuarios />}></Route>
            <Route path="/sobre/backend" element={<Backend />}></Route>
            <Route path="/sobre/frontend" element={<Frontend />}></Route>
          </Routes>

        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
