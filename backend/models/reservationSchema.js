import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minLength: [2, "First name must be at least 2 characters"],
    maxLength: [30, "First name cannot exceed 30 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minLength: [2, "Last name must be at least 2 characters"],
    maxLength: [30, "Last name cannot exceed 30 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Please enter a valid email address"
    }
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: "Phone number must be 10 digits"
    }
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
    min: [new Date(), "Date must be in the future"]
  },
  time: {
    type: String,
    required: [true, "Time is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Reservation = mongoose.model("Reservation", reservationSchema);