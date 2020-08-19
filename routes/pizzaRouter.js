const express = require('express');
const router = express.Router();

const menuPizza = require('../models/pizzaModels');

// Geting all
router.get('/', async (req, res) => {
    try {
        const pizzas = await menuPizza.find();
        res.json(pizzas)
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
});

// Geting one
router.get('/:id', getPizza, (req, res) => {
    res.json(res.pizza)
});
// Creating one
router.post('/', async (req, res) => {
    const pizza = new menuPizza({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        size: req.body.size
    });
    try {
        const newPizza = await pizza.save();
        res.status(201).json(newPizza);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
// Updating one
router.patch('/:id', getPizza, (req, res) => {
    if(req.body.name !== null) {
        res.pizza.name = req.body.name
    }
    
});
// Deleting one
router.delete('/:id', getPizza, async (req, res) => {
    try {
        await res.pizza.remove();
        res.json({ message: 'Deleted success'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


async function getPizza(req, res, next) {
    let pizza;
    try {
        pizza = await menuPizza.findById(req.params.id);

        if(pizza == null) {
            return res.status(404).json({message: 'Cannot find pizza'})
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.pizza = pizza;
    next();
}

module.exports = router;