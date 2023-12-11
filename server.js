const express = require('express')
require('dotenv').config();
const cors = require('cors');
const app = express()
const port = process.env.PORT
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');
const categoryRoutes = require('./routes/category.route');
const productRoutes = require('./routes/product.route');

//DB Connexion
connectDB()

//middleware
app.use(cors())
app.use(express.json())
app.use("/api/user", userRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes)

app.get('/', (req, res) => res.send('/api/user/login maybe?'))
app.listen(port, () => console.log(`listening on port ${port}!`))