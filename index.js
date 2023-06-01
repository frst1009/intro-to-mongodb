const { default: mongoose } = require("mongoose");
const { Schema } = mongoose
const express = require('express');

const app = express();

app.use(express.json())
//E83U1GSN8C5eOnVZ


mongoose.connect('mongodb+srv://ilahaeshu:E83U1GSN8C5eOnVZ@cluster0.ehxhrlt.mongodb.net/frontend');


let productSchema = new Schema({
    name: {type: String},
    unitPrice: {type: Number},
    unitInStock: {type: Number},
    date: {type: Date,
    default: Date.now }

})
let Product = mongoose.model('Product', productSchema)


app.get('/api/products', (req, res) => {

    Product.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

app.get('/api/products/:id', (req, res) => {

    let id = req.params.id;

    Product.findById(id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })

})



app.post('/api/products', (req, res) => {

    let product = new Product({
        name: req.body.name,
        unitPrice: req.body.unitPrice,
        unitInStock: req.body.unitInStock
    })

    product.save();

    res.json(product);

})

app.delete('/api/products/:id', (req, res) => {

    let id = req.params.id;

    Product.findByIdAndRemove(id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json(err)
    })

})



app.listen(3000,()=>{
    console.log('listening');
})

