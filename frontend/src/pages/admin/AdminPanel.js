import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct, createProduct } from '../../services/adminService';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({name: '', description:'', price:''});

    const loadProducts = () => {
        getProducts().then(res => setProducts(res.data));
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = (index) => {
        const product = products[index];
        deleteProduct(product.name).then(() => loadProducts());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(form).then(() => {
            setForm({ name: '', description: '', price: '' });
            loadProducts();
        });
    };

    return (
        <div>
            <h2>Panel de Administración</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value})}/>
                <input name="descrition" placeholder="Descrición" value={form.description} onChange={e => setForm({ ...form, description: e.target.value})}/>
                <input name="price" type="number" placeholder="Precio" value={form.price} onChange={e => setForm({ ...form, price: e.target.value})}/>
                <button type="submit">Agregar producto</button>
            </form>
            <ul>
                {products.map((p, i) => (
                    <li key={i}>{p.name} - ${p.price} <button onClick={() => handleDelete(i)}>Eliminar
                    </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;