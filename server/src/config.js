import dotenv from 'dotenv';

dotenv.config();

export default {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY || '1h',
  mongoURI: process.env.MONGO_URI,
  corsOrigin: process.env.CORS_ORIGIN,
};
