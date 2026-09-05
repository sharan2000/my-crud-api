const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ force: true }).then(() => {
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