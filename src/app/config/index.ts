import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const config = {
  port: process.env.PORT || 5000,  // Default to 3000 if PORT is not set
  nodeEnv: process.env.NODE_ENV,  // Default to 'development' if NODE_ENV is not set
  dbUrl: process.env.DATABASE_URL,  // MongoDB connection string from .env
  
};

export default config;
