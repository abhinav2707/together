const { sequelize } = require('./db');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Database connected successfully.');
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;
