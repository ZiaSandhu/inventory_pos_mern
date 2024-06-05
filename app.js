require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const {logger} = require('./middleware/logger')
const db = require('./database/models')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger)

app.use(express.json());
app.use('/api', routes);

app.use('*',(_,res )=>{
    res.status(409).json({message: "Invalid Request"})
})

app.use(errorHandler)

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Database connected on port ${process.env.DB_PORT}`);
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
