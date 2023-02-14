const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let orders = [];

app.post('/order', (req, res) => {
  const order = req.body;
  orders.push(order);
  res.send({ message: 'Order placed successfully!' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
