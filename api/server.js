const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const port = 8000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const db = low(adapter)

// startar serven. 
app.listen(port, () => {
    console.log('app started');
});
// hämtar mina produkter
app.get('/api/products', (request, response) => {
    const products = db.get('products').value();
    response.send(products);
});
// hämtar mina cart
app.get('/api/cart', (request, response) => {
    const cart = db.get('cart').value();
    response.send(cart);
});
// pushar produkt till min cart.
app.post("/api/cart", (request, response) => {
    const product = request.body;
    console.log(product)

    //kollar ifall produkten finns i cart.
    if (!ProductInProducts(product.id)) {
        response.send('Produkten finns inte i sortimentet');
        return;
    }
    // retunerar true om den finns i kundvagnen.
    if (ProductInCart(product.id)) {
        response.send('Produkten finns redan i kundvagnen');
        return;
    }
    // //lägger till i kundvagnen.
    db.get("cart").push(product).write();
    response.send('produkten är tillagd');
});
// tar bort innehållet i kart och söker ihjälp av id.
app.delete('/api/cart/:id', (request, response) => {
    const id = request.params.id;
    if (!ProductInCart(id)) {
        response.send('Produkten finns inte i kundvagnen');
        return;
    }
    //tar bort produkt. 
    db.get('cart').remove({ id: parseInt(id) }).write()
    response.send('Produkten är borttagen.');
})

function ProductInCart(productId) {
    return db.get('cart').find({ id: parseInt(productId) }).value() !== undefined;
}

function ProductInProducts(productId) {
    return db.get('products').find({ id: parseInt(productId) }).value() !== undefined;
}