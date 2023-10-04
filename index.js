const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

const productRoutes=require('./productRoutes')
const stockRoutes=require('./stockRoutes')

const mongodb=require('./repository/mongodb')
app.use(bodyParser.json())


app.use('/inventory',productRoutes)
app.use('/inventory',stockRoutes)

app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
