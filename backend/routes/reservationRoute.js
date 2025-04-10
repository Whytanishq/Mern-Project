import express from 'express';
import { sendReservation } from '../controller/reservation.js';

const router = express.Router();

// This must match exactly what your frontend is calling
router.post('/', sendReservation); 

export default router;