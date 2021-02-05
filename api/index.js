//IMPORTS
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')



//APP = EXPRESS
const app = express()




//APP USE
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())


//ROUTES
app.get('/', (req, res) => {
    res.json('Hello world')
})

app.use('/api', require('./routes/users'))
app.use('/api', require('./routes/products'))
app.use('/api', require('./routes/categorys'))
app.use('/api', require('./routes/owner'))


const uri = 'mongodb://localhost:27017/amazon'
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  authSource: "admin"
};
mongoose.connect(uri, options).then(
  () => {
    console.log("\n");
    console.log("*******************************".green);
    console.log("✔ Mongo Successfully Connected!".green);
    console.log("*******************************".green);
    console.log("\n");
  },
  err => {
    console.log("\n");
    console.log("*******************************".red);
    console.log("    Mongo Connection Failed    ".red);
    console.log("*******************************".red);
    console.log("\n");
    console.log(err);
  }
);



const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
})