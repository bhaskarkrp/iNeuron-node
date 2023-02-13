const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// routes
require('./routes/index.route')(app);
app.get('/', (req, res) => {
    return res.send({ message: 'Welcome' })
})
const url = 'mongodb+srv://ineuron:ineuron@cluster0.gd3psko.mongodb.net/?retryWrites=true&w=majority' //shpuld not be open
const uri = process.env.MONGODB_URI || url;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB databse connection established successfully`);
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})