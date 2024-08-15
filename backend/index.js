require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.route')
const adminRoutes = require('./routes/admin.route')
const ProduitRoutes = require('./routes/produit.route')
const ClientRoutes = require('./routes/client.route')
const cors = require('cors');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = ['http://localhost:5173', 'http://192.168.1.6:3000', 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like from mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

//routes
app.use('/users' , userRoutes)
app.use('/admins' , adminRoutes)
app.use('/produits' , ProduitRoutes)
app.use('/clients' , ClientRoutes)


//server and db connection
mongoose.connect('mongodb://localhost:27017/GestionStock')
.then(()=>{
    console.log('db connected successfull !');
    app.listen(3000, ()=>{
    console.log('server running on port 3000') })
})
.catch(()=>{console.log('error connecting to db');})
