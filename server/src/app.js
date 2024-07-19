import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';
import config from './config.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: config.corsOrigin.split(','), // Allow multiple origins if needed
    credentials: true,
  })
);

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'cross-origin-allow-popups');
    next();
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// mongoose.connect(config.mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error: ', err));

app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export { app };
