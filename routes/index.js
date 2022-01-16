const express = require("express");
const routes = express.Router();

const customers = [
  { id: 1, name: "customer1" },
  { id: 2, name: "customer2" },
  { id: 3, name: "customer3" },
  { id: 4, name: "customer4" },
  { id: 5, name: "customer5" },
  { id: 6, name: "customer6" },
  { id: 7, name: "customer7" },
];

const validateCustomer = {
  imput(name, massage) {
    if (!name) return massage;
  },
  find(id, c) {
    return customers.find((customer) => customer.id === parseInt(id));
  },
};

const identity = { value: 8 };
function newIdentity() {
  return ++identity.value;
}
routes.get("/", (req, res) => {
  res.send(customers);
});

routes.post("/", (req, res) => {
  const customer = {
    id: newIdentity(),
    name: req.body.name,
  };
  customers.push(customer);
  return res.send(customers);
});

routes.put("/:id", (req, res) => {
  validateCustomer.imput(
    req.body.name,
    0,
    res.status(400).send("enter a valid id")
  );
  const customer = validateCustomer.find(req.params.id);
  customer.name = req.body.name;
  return res.send(customers);
});

routes.delete("/:id", (req, res) => {
  const customer = validateCustomer.find(req.params.id);
  if (!customer)
    return res
      .status(400)
      .send(`The customer with id ${req.params.id} was not found`);
  const indexOf = customers.indexOf(customer);
  customers.splice(indexOf, 1);
  return res.send(customers);
});

module.exports = routes;
