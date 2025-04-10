import { Reservation } from "../models/reservationSchema.js";
import ErrorHandler from "../error/error.js";

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time } = req.body;

  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ErrorHandler("Please fill all fields completely", 400));
  }

  try {
    await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time
    });

    res.status(201).json({
      success: true,
      message: "Reservation created successfully!"
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(messages.join(", "), 400));
    }
    
    if (error.code === 11000) {
      return next(new ErrorHandler("Duplicate reservation found", 409));
    }
    
    return next(error);
  }
};