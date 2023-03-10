import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }));

import ProductManager from './ProductManager.js';

const productManager = new ProductManager('./productos.json');

// Ruta de la cual se leen todos los productos y devuelve dentro un objeto. con limite de resultados. si no tiene limite devuelve todo.
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        
        const products = await productManager.getProducts();
        
        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(products);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta para recibir por params el pid, con id para recibir un producto especifico
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;

        const product = await productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});
