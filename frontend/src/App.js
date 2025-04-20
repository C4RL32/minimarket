import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './pages/cart/Cart';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Cart />} /> {/* Opcional: redirige raíz a carrito */}
      </Routes>
    </Router>
  );
}

export default App;