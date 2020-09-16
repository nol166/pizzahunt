const { Pizza } = require('../models');

const pizzaController = {
  // Get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .then(pizzas => res.json(pizzas))
      .catch(err => res.status(500).json(err));
  },

  // Get one pizza by ID
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .then(pizza => {
        // If no pizza is found, send a 404
        if (!pizza) {
          res.status(404).json({ message: 'no pizza found' });
          return;
        }
        res.json(pizza);
      })
      .catch(err => res.status(400).json(err));
  },

  // Create a pizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then(pizza => res.json(pizza))
      .catch(err => res.status(400).json(err));
  },

  // Update a pizza by id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(pizza => {
        if (!pizza) {
          res.status(404).json({ message: "Pizza with that ID wasn't found" });
          return;
        }
        res.json(pizza);
      })
      .catch(err => res.status(400).json(err));
  },

  // Delete a pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(pizza => {
        if (!pizza) {
          res.status(404).json({ message: 'No pizza found with that ID' });
          return;
        }
        res.json(pizza);
      })
      .catch(err => res.status(400).json(err));
  },
};

module.exports = pizzaController;
