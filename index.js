require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Client = require('./models/client');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// app.post('/client', async (req, res) => {
//   try {
//     const {
//       name,
//       phone,
//       email,
//       address,
//       numberofProducts,
//       productCode,
//       quantity,
//       TotalPrice
//     } = req.body;

//     if (!name || !phone || !email || !address || !productCode || !quantity || !TotalPrice || !numberofProducts) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const newOrder = new Client({
//       name,
//       phone,
//       email,
//       address,
//       numberofProducts,
//       products: [
//         {
//           productCode,
//           quantity
//         }
//       ],
//       TotalPrice
//     });

//     await newOrder.save();
//     res.status(201).json({ message: 'Order created successfully', order: newOrder });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


app.post('/client', async (req, res) => {
  try {
    const { name, phone, email, address, products, TotalPrice } = req.body;

    if (!name || !phone || !email || !address || !products || !TotalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOrder = new Client({
      name,
      phone,
      email,
      address,
      numberofProducts: products.length, // Automatically count products
      products: products.map(p => ({
        productCode: p.productCode.trim().toUpperCase(),
        quantity: p.quantity
      })),
      TotalPrice
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});






mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('✅ Database connected successfully');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT}`);
  });
})
.catch(err => {
  console.error('❌ Database connection error:', err);
});
