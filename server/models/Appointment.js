const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentNumber: { type: String, required: true, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g. "10:30 AM"
  type: { type: String, enum: ['Online Consultation', 'Offline Consultation', 'Video Consultation'], default: 'Video Consultation' },
  consultationFee: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Refunded'], default: 'Paid' },
  paymentId: String,
  status: { 
    type: String, 
    enum: ['Booked', 'Confirmed', 'Waiting Room', 'In Progress', 'Completed', 'Cancelled', 'Rescheduled', 'No Show'], 
    default: 'Confirmed' 
  },
  symptoms: String,
  patientNotes: String,
  cancellationReason: String,
  rescheduledTo: Date,
  meetingRoomId: String,
  prescriptionGenerated: { type: Boolean, default: false },
  reportGenerated: { type: Boolean, default: false }
}, { timestamps: true });

appointmentSchema.index({ doctor: 1, appointmentDate: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
