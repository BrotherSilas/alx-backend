import express from 'express';
import kue from 'kue';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const queue = kue.createQueue();
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);

const listProducts = [
    { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
    { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
    { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
    { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
];

function getItemById(id) {
    return listProducts.find(item => item.id === parseInt(id));
}

async function getCurrentReservedStockById(itemId) {
    const currentReservedStock = await getAsync(`item.${itemId}`);
    return currentReservedStock ? parseInt(currentReservedStock) : 0;
}

function reserveStockById(itemId, stock) {
    redisClient.set(`item.${itemId}`, stock);
}

app.get('/list_products', (req, res) => {
    res.json(listProducts.map(product => ({
        itemId: product.id,
        itemName: product.name,
        price: product.price,
        initialAvailableQuantity: product.stock
    })));
});

app.get('/list_products/:itemId', async (req, res) => {
    const product = getItemById(req.params.itemId);
    if (!product) {
        return res.json({ status: 'Product not found' });
    }
    
    const currentQuantity = await getCurrentReservedStockById(product.id);
    res.json({
        itemId: product.id,
        itemName: product.name,
        price: product.price,
        initialAvailableQuantity: product.stock,
        currentQuantity
    });
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const product = getItemById(req.params.itemId);
    if (!product) {
        return res.json({ status: 'Product not found' });
    }

    const currentStock = await getCurrentReservedStockById(product.id);
    if (currentStock >= product.stock) {
        return res.json({ status: 'Not enough stock available', itemId: product.id });
    }

    reserveStockById(product.id, currentStock + 1);
    res.json({ status: 'Reservation confirmed', itemId: product.id });
});

const PORT = 1245;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

