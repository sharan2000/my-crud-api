const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

// function hello() {}
// console.log(`__________________${process.env.START_MESSAGE}__________________`)
console.log(`__________________${process.env.ENV_START_MESSAGE}__________________`)
console.log(`__________________${process.env.ENV_SECRET_MESSAGE}__________________`)

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to sync database:', err);
  });
}

// Export app for testing
module.exports = app;