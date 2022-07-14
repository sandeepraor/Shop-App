const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const app = express();

dotenv.config();
//db connect
// console.log(process.env.MONGODB_URI );
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log('db connected Successfully');
  }
);

const PORT = process.env.PORT || 8080;

//use express middlewaree
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use serRouter
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

//error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//server
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}. http://localhost:${PORT}`);
});
