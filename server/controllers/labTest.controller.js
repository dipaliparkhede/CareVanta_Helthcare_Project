const LabTest = require('../models/LabTest');
const LabBooking = require('../models/LabBooking');
const asyncHandler = require('../utils/asyncHandler');
const { generateUniqueId } = require('../utils/helpers');

// List Diagnostic Tests
const getLabTests = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  let query = {};
  if (category && category !== 'All') query.category = category;
  if (search) query.name = new RegExp(search, 'i');

  const tests = await LabTest.find(query).sort({ rating: -1 });
  res.json({ success: true, count: tests.length, tests });
});

// Book Diagnostic Test
const bookLabTest = asyncHandler(async (req, res) => {
  const { testIds, collectionType, scheduledDate, timeSlot, collectionAddress } = req.body;

  const tests = await LabTest.find({ _id: { $in: testIds } });
  if (!tests.length) {
    return res.status(400).json({ success: false, message: 'No valid lab tests selected.' });
  }

  const items = tests.map(t => ({ test: t._id, name: t.name, price: t.price }));
  const totalAmount = items.reduce((sum, i) => sum + i.price, 0);
  const bookingNumber = generateUniqueId('LAB');

  const booking = await LabBooking.create({
    bookingNumber,
    patient: req.user.id,
    tests: items,
    collectionType: collectionType || 'Home Sample Collection',
    scheduledDate: new Date(scheduledDate),
    timeSlot: timeSlot || '08:00 AM - 10:00 AM',
    collectionAddress,
    totalAmount,
    status: 'Booked'
  });

  res.status(201).json({
    success: true,
    message: 'Diagnostic test booked successfully.',
    booking
  });
});

// Patient Lab Bookings
const getMyLabBookings = asyncHandler(async (req, res) => {
  const bookings = await LabBooking.find({ patient: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, count: bookings.length, bookings });
});

module.exports = { getLabTests, bookLabTest, getMyLabBookings };
