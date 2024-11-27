import express from "express";

/* Postman Endpoints & Payload */
const app = express();

/* Parse Request Body Middleware */
app.use(express.json());

/* CORS Middleware */
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, PATCH, DELETE",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Max-Age": 2_592_000,
    });
    next();
});

/* Logger Middleware */
app.use((req, res, next) => {
    const date = new Date().toISOString();
    const { method, path } = req
    console.log(`${date} - [${method}] "${path}"`);
    next();
});


/* Util */
const _id = () => "_" + Math.round(Date.now() * Math.random()).toString(16).slice(2);

/* Discount codes Database */
const discountCodes = {
    "DUPA": 0.8,
};

/* Discount business logic */
const applyDiscount = (req, product) => {
    const discountedRatio = discountCodes[req.query.discount?.toUpperCase()];
    const discountedPrice = parseFloat((product.price * discountedRatio).toFixed(2));

    return discountedRatio
        ? { ...product, price: discountedPrice }
        : product;
};

/* Products Database */
const products = new Map([
    { id: "_jappko", category: "FOOD", name: "Apple", price: 42.20 },
    { id: _id(), category: "FOOD", name: "Banana", price: 13.37 },
    { id: _id(), category: "FOOD", name: "Corn", price: 0.69 },
    { id: _id(), category: "FURNITURE", name: "Sofa", price: 2400 },
    { id: _id(), category: "FURNITURE", name: "Chair", price: 1234 },
].map(p => [p.id, p]));



/* Routes */

/* localhost:3000/products/unknown */
/* localhost:3000/products/_jappko */
/* localhost:3000/products/_jappko?discount=abc */
/* localhost:3000/products/_jappko?discount=dupa */
/* localhost:3000/products/_jappko?discount=DUPA */
app.get("/products/:id", (req, res) => {
    const id = req.params.id ?? null;
    
    const productById = products.get(id);
    
    if (!productById) return res.sendStatus(404);

    const requestedProduct = applyDiscount(req, productById);

    return res.json(requestedProduct);
});

/* localhost:3000/products */
/* localhost:3000/products?category=dupa */
/* localhost:3000/products?category=FOOD */
/* localhost:3000/products?category=FURNITURE */
app.get("/products", (req, res) => {
    const category = req.query.category ?? null;
    if (category) {
        const productsByCategory = [...products.values()]
            .filter(p => p.category === category.toUpperCase())
            .map(p => applyDiscount(req, p));
        return res.json(productsByCategory);
    }

    const allProducts = [...products.values()]
        .map(p => applyDiscount(req, p));

    return res.json(allProducts);
});

/* localhost:3000/products */
/* { "category": "FURNITURE", "name": "Desk", "price": 5000 } */
const requiredProductFields = ["category", "name", "price"];
app.post("/products", (req, res) => {
    const productFields = Object.keys(req.body);
    const isValidProduct = requiredProductFields
        .every(field => productFields.includes(field));
    if (!isValidProduct) return res.sendStatus(400);

    const id = _id();
    const createdProduct = { ...req.body, id };

    products.set(id, createdProduct);

    return res.status(201).json({ id });
});

/* localhost:3000/products/_jappko */
/* { "category": "FRUIT", "name": "Apfel", "price": 3.14 } */
app.put("/products/:id", (req, res) => {
    const id = req.params.id ?? null;
    if (!id) return res.sendStatus(404);
    
    const productById = products.get(id);
    
    if (!productById) return res.sendStatus(404);

    const productFields = Object.keys(req.body);
    const isValidProduct = requiredProductFields
        .every(field => productFields.includes(field));
    if (!isValidProduct) return res.sendStatus(400);

    const replacedProduct = { ...req.body, id };

    products.set(id, replacedProduct);

    return res.status(201).json(replacedProduct);
});

/* localhost:3000/products/_jappko */
/* { "price": 4.20 } */
app.patch("/products/:id", (req, res) => {
    const id = req.params.id ?? null;
    if (!id) return res.sendStatus(404);
    
    const productById = products.get(req.params.id);
    
    if (!productById) return res.sendStatus(404);

    const { category, name, price } = req.body;
    const updatedPartialProduct = {
        ...(category && { category }),
        ...(name && { name }),
        ...(price && { price }),
    };

    const updatedProduct = { ...productById, ...updatedPartialProduct, id };

    products.set(id, updatedProduct);

    return res.status(201).json(updatedProduct);
});

/* localhost:3000/products/_jappko */
app.delete("/products/:id", (req, res) => {
    const id = req.params.id ?? null;
    if (!id) return res.sendStatus(404);

    const productToDelete = products.has(id);
    if (!productToDelete) return res.sendStatus(404);

    products.delete(id);

    return res.sendStatus(204);
});

/* Starting the server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    const startTime = new Date().toLocaleString();
    console.log(`[${startTime}] Server listening at port ${PORT}...`);
});
