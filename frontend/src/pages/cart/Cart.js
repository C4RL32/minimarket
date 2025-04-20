import React, { useState } from 'react';
import { sendOrder } from '../../services/cartService';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { name: "Leche", price: 2.5 },
    { name: "Pan", price: 1.0 }
  ]);

  const [message, setMessage] = useState('');

  const handleRemove = index => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const handleOrder = async () => {
    try {
      const res = await sendOrder(cartItems);
      setMessage(res.data.message);
      setCartItems([]);
    } catch (err) {
      setMessage('Error al enviar pedido');
    }
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index}>
            <p>{item.name} - ${item.price}</p>
            <button onClick={() => handleRemove(index)}>Eliminar</button>
          </div>
        ))
      )}
      <button onClick={handleOrder} disabled={cartItems.length === 0}>
        Enviar Pedido
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Cart;
