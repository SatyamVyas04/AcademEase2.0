import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from '../config.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    passoutYear: {
      type: String,
    },
    college: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    program: {
      type: String,
    },
    cgpa: {
      type: String,
    },
    academicInterests: {
      type: [String],
    },
    goals: {
      type: [String],
    },
    avatar: {
      type: String, // Cloudinary URL
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiry }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    config.jwtSecret,
    { expiresIn: '7d' }
  );
};

export const User = mongoose.model("User", userSchema);
