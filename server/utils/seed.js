require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const Pharmacy = require('../models/Pharmacy');
const Laboratory = require('../models/Laboratory');
const Medicine = require('../models/Medicine');
const MedicineCategory = require('../models/MedicineCategory');
const LabTest = require('../models/LabTest');
const HealthPackage = require('../models/HealthPackage');
const MedicalReport = require('../models/MedicalReport');
const { generateReportPDF } = require('../services/pdf/reportGenerator');
const path = require('path');
const fs = require('fs');

const seedData = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/carevanta-ai';
    await mongoose.connect(uri);
    console.log('🌱 Connected to MongoDB for CareVanta Ecosystem Seeding...');

    // Clear existing
    await Promise.all([
      User.deleteMany({}),
      Doctor.deleteMany({}),
      Hospital.deleteMany({}),
      Pharmacy.deleteMany({}),
      Laboratory.deleteMany({}),
      Medicine.deleteMany({}),
      MedicineCategory.deleteMany({}),
      LabTest.deleteMany({}),
      HealthPackage.deleteMany({}),
      MedicalReport.deleteMany({})
    ]);

    console.log('🧹 Purged old demo records.');

    // 1. Users for all 6 roles
    const adminUser = await User.create({
      firstName: 'Dipali',
      lastName: 'Parkhede',
      email: 'admin@carevanta.ai',
      password: 'Admin@Password123',
      phone: '+91 98201 12345',
      role: 'super_admin',
      isVerified: true
    });

    const docUser1 = await User.create({
      firstName: 'Dr. Dipali',
      lastName: 'Parkhede',
      email: 'dr.sharma@carevanta.ai',
      password: 'Doctor@Password123',
      phone: '+91 98202 23456',
      role: 'doctor',
      gender: 'Female',
      avatar: 'https://images.unsplash.com/photo-1594824813575-f538e124d9c7?w=400',
      isVerified: true
    });

    const docUser2 = await User.create({
      firstName: 'Dr. Dipali',
      lastName: 'Parkhede',
      email: 'dr.ananya@carevanta.ai',
      password: 'Doctor@Password123',
      phone: '+91 98203 34567',
      role: 'doctor',
      gender: 'Female',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
      isVerified: true
    });

    const docUser3 = await User.create({
      firstName: 'Dr. Dipali',
      lastName: 'Parkhede',
      email: 'dr.arjun@carevanta.ai',
      password: 'Doctor@Password123',
      phone: '+91 98204 45678',
      role: 'doctor',
      gender: 'Female',
      avatar: 'https://images.unsplash.com/photo-1594824813575-f538e124d9c7?w=400',
      isVerified: true
    });

    const patientUser = await User.create({
      firstName: 'Dipali',
      lastName: 'Parkhede',
      email: 'patient@carevanta.ai',
      password: 'Patient@Password123',
      phone: '+91 98205 56789',
      role: 'patient',
      gender: 'Female',
      bloodGroup: 'B+',
      isVerified: true
    });

    const pharmacistUser = await User.create({
      firstName: 'Dipali',
      lastName: 'Parkhede',
      email: 'pharmacist@carevanta.ai',
      password: 'Pharmacy@Password123',
      phone: '+91 98206 67890',
      role: 'pharmacist',
      isVerified: true
    });

    const labAdminUser = await User.create({
      firstName: 'Dr. Dipali',
      lastName: 'Parkhede',
      email: 'lab@carevanta.ai',
      password: 'Lab@Password123',
      phone: '+91 98207 78901',
      role: 'lab_admin',
      isVerified: true
    });

    const hospitalAdminUser = await User.create({
      firstName: 'Dipali',
      lastName: 'Parkhede',
      email: 'hospital@carevanta.ai',
      password: 'Hospital@Password123',
      phone: '+91 98208 89012',
      role: 'hospital_admin',
      isVerified: true
    });

    console.log('✅ Seeded users for all 6 roles.');

    // 2. Hospital
    const hospital = await Hospital.create({
      name: 'CareVanta Dipali Parkhede Super Specialty Hospital',
      adminUser: hospitalAdminUser._id,
      registrationNumber: 'HOSP-MAH-2024-001',
      type: 'Multi-Specialty',
      address: { street: 'Bandra Kurla Complex', city: 'Mumbai', state: 'Maharashtra', pincode: '400051' },
      phone: '+91 22 2650 1000',
      email: 'hospital@carevanta.ai',
      bedCapacity: 350,
      availableBeds: 82,
      emergencyServices: true,
      rating: 4.9
    });

    // 3. Doctors
    const doctor1 = await Doctor.create({
      user: docUser1._id,
      specialization: 'Cardiologist',
      qualifications: ['MBBS', 'MD (Cardiology)', 'FACC'],
      registrationNumber: 'MCI-CARD-89102',
      experienceYears: 16,
      consultationFee: 800,
      hospital: hospital._id,
      bio: 'Leading interventional cardiologist specializing in coronary care, preventative cardiology, and telemedicine consultation.',
      languages: ['English', 'Hindi', 'Marathi'],
      rating: 4.9,
      totalReviews: 245,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      availableTimeSlots: [
        { startTime: '09:00 AM', endTime: '01:00 PM', slotDurationMinutes: 30 },
        { startTime: '04:00 PM', endTime: '08:00 PM', slotDurationMinutes: 30 }
      ]
    });

    const doctor2 = await Doctor.create({
      user: docUser2._id,
      specialization: 'Neurologist',
      qualifications: ['MBBS', 'DM (Neurology)', 'FRCP'],
      registrationNumber: 'MCI-NEUR-77341',
      experienceYears: 12,
      consultationFee: 750,
      hospital: hospital._id,
      bio: 'Specialist in migraine management, cerebrovascular disorders, cognitive wellness, and comprehensive neurological evaluations.',
      languages: ['English', 'Hindi', 'Marathi'],
      rating: 4.8,
      totalReviews: 189,
      availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      availableTimeSlots: [
        { startTime: '10:00 AM', endTime: '02:00 PM', slotDurationMinutes: 30 }
      ]
    });

    const doctor3 = await Doctor.create({
      user: docUser3._id,
      specialization: 'General Physician',
      qualifications: ['MBBS', 'MD (General Medicine)'],
      registrationNumber: 'MCI-GEN-55109',
      experienceYears: 9,
      consultationFee: 500,
      hospital: hospital._id,
      bio: 'Family physician with wide experience in preventative healthcare, infectious diseases, hypertension, and diabetes management.',
      languages: ['English', 'Hindi'],
      rating: 4.7,
      totalReviews: 310,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      availableTimeSlots: [
        { startTime: '09:00 AM', endTime: '01:00 PM', slotDurationMinutes: 20 },
        { startTime: '03:00 PM', endTime: '07:00 PM', slotDurationMinutes: 20 }
      ]
    });

    // 4. Pharmacy
    const pharmacy = await Pharmacy.create({
      name: 'Dipali Parkhede Express Digital Pharmacy',
      adminUser: pharmacistUser._id,
      licenseNumber: 'PHARM-DL-2024-44102',
      gstNumber: '27AABCU9603R1ZM',
      address: { street: 'Andheri East', city: 'Mumbai', state: 'Maharashtra', pincode: '400069' },
      phone: '+91 22 2830 5500',
      email: 'pharmacy@carevanta.ai',
      is24x7: true,
      rating: 4.8
    });

    // 5. Laboratory
    const lab = await Laboratory.create({
      name: 'Dipali Parkhede Precision PathLabs & Diagnostics',
      adminUser: labAdminUser._id,
      licenseNumber: 'LAB-NABL-2024-1188',
      nablAccredited: true,
      address: { street: 'Dadar West', city: 'Mumbai', state: 'Maharashtra', pincode: '400028' },
      phone: '+91 22 2430 7700',
      email: 'lab@carevanta.ai',
      homeSampleCollection: true,
      rating: 4.9
    });

    // 6. Medicine Categories
    const categoriesData = [
      { name: 'Tablets', slug: 'tablets', description: 'Essential solid pharmaceutical tablets' },
      { name: 'Capsules', slug: 'capsules', description: 'Extended release and soft gelatin capsules' },
      { name: 'Syrups', slug: 'syrups', description: 'Pediatric and adult oral liquid formulations' },
      { name: 'Vitamins & Supplements', slug: 'vitamins', description: 'Daily essential multivitamins, minerals and immune boosters' },
      { name: 'First Aid & Surgical', slug: 'first-aid', description: 'Bandages, antiseptics, and wound care' },
      { name: 'Diabetes Care', slug: 'diabetes-care', description: 'Glucometers, test strips, and glycemic control medications' },
      { name: 'Skin Care', slug: 'skin-care', description: 'Dermatologist approved therapeutic ointments and topicals' },
      { name: 'Medical Devices', slug: 'medical-devices', description: 'BP monitors, pulse oximeters, digital thermometers' },
      { name: 'General Wellness', slug: 'general-wellness', description: 'Herbal tonics and everyday vitality essentials' }
    ];
    const categories = await MedicineCategory.insertMany(categoriesData);
    const catMap = {};
    categories.forEach(c => { catMap[c.slug] = c._id; });

    // 7. Medicines
    const medicinesData = [
      {
        name: 'Dolo 650mg Paracetamol',
        brand: 'Micro Labs',
        composition: 'Paracetamol 650mg',
        category: catMap['tablets'],
        categoryName: 'Tablets',
        description: 'Standard antipyretic and analgesic for quick relief from fever, body aches, and headaches.',
        dosageForm: 'Tablet',
        strength: '650mg',
        packSize: '15 Tablets per strip',
        price: 32,
        mrp: 36,
        discountPercent: 11,
        prescriptionRequired: false,
        stockQuantity: 450,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
        rating: 4.9,
        totalReviews: 540
      },
      {
        name: 'Augmentin 625 Duo Tablet',
        brand: 'GSK Pharmaceuticals',
        composition: 'Amoxicillin 500mg + Potassium Clavulanate 125mg',
        category: catMap['tablets'],
        categoryName: 'Tablets',
        description: 'Broad spectrum antibiotic for respiratory tract, urinary, and skin bacterial infections.',
        dosageForm: 'Tablet',
        strength: '625mg',
        packSize: '10 Tablets per strip',
        price: 195,
        mrp: 220,
        discountPercent: 11,
        prescriptionRequired: true,
        stockQuantity: 120,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500',
        rating: 4.8,
        totalReviews: 280
      },
      {
        name: 'Glycomet GP 1 Tablet',
        brand: 'USV Pvt Ltd',
        composition: 'Metformin 500mg + Glimepiride 1mg',
        category: catMap['diabetes-care'],
        categoryName: 'Diabetes Care',
        description: 'Combination antidiabetic medicine for glycemic control in adult Type 2 Diabetes.',
        dosageForm: 'Tablet',
        strength: '500mg/1mg',
        packSize: '15 Tablets per strip',
        price: 115,
        mrp: 130,
        discountPercent: 12,
        prescriptionRequired: true,
        stockQuantity: 200,
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500',
        rating: 4.7,
        totalReviews: 195
      },
      {
        name: 'Shelcal 500 Calcium + Vitamin D3',
        brand: 'Torrent Pharmaceuticals',
        composition: 'Elemental Calcium 500mg + Vitamin D3 250 IU',
        category: catMap['vitamins'],
        categoryName: 'Vitamins & Supplements',
        description: 'Supports high bone density, joint mobility, and prevents osteoporosis in adults.',
        dosageForm: 'Tablet',
        strength: '500mg',
        packSize: '15 Tablets per strip',
        price: 125,
        mrp: 140,
        discountPercent: 10,
        prescriptionRequired: false,
        stockQuantity: 380,
        image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500',
        rating: 4.9,
        totalReviews: 410
      },
      {
        name: 'Omron HEM 7120 Digital BP Monitor',
        brand: 'Omron Healthcare',
        composition: 'Oscillometric Digital Blood Pressure Monitor with Cuff',
        category: catMap['medical-devices'],
        categoryName: 'Medical Devices',
        description: 'Fully automatic digital blood pressure monitor with Intellisense technology and hypertension indicator.',
        dosageForm: 'Device',
        strength: 'Standard Adult Cuff',
        packSize: '1 Unit Kit',
        price: 2199,
        mrp: 2650,
        discountPercent: 17,
        prescriptionRequired: false,
        stockQuantity: 45,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500',
        rating: 4.9,
        totalReviews: 320
      },
      {
        name: 'Accu-Chek Active Blood Glucose Strips',
        brand: 'Roche Diabetes Care',
        composition: 'Glucose Test Strips with Capillary Action',
        category: catMap['diabetes-care'],
        categoryName: 'Diabetes Care',
        description: 'High accuracy self-monitoring blood glucose test strips for Accu-Chek Active meter.',
        dosageForm: 'Device',
        strength: '50 Strips Box',
        packSize: '50 Strips',
        price: 949,
        mrp: 1099,
        discountPercent: 14,
        prescriptionRequired: false,
        stockQuantity: 90,
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500',
        rating: 4.8,
        totalReviews: 240
      }
    ];
    await Medicine.insertMany(medicinesData);
    console.log('✅ Seeded medicines catalog.');

    // 8. Lab Tests
    const labTestsData = [
      {
        name: 'Complete Blood Count (CBC) with ESR',
        code: 'LAB-CBC-01',
        category: 'Hematology',
        description: 'Measures RBC, WBC count, Platelets, Hemoglobin, Hematocrit and Erythrocyte Sedimentation Rate.',
        sampleType: 'Blood (EDTA Tube)',
        fastingRequired: false,
        tatHours: 12,
        price: 350,
        mrp: 450,
        discountPercent: 22,
        homeCollectionAvailable: true,
        laboratory: lab._id,
        parametersIncluded: ['Hemoglobin', 'Total Leucocyte Count (TLC)', 'Platelet Count', 'RBC Count', 'ESR']
      },
      {
        name: 'Comprehensive Lipid Profile Test',
        code: 'LAB-LIPID-02',
        category: 'Biochemistry',
        description: 'Crucial screen for cardiovascular risk evaluating Total Cholesterol, HDL, LDL, VLDL and Triglycerides.',
        sampleType: 'Blood (Serum Gel Tube)',
        fastingRequired: true,
        tatHours: 18,
        price: 650,
        mrp: 850,
        discountPercent: 23,
        homeCollectionAvailable: true,
        laboratory: lab._id,
        parametersIncluded: ['Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'Triglycerides', 'VLDL']
      },
      {
        name: 'Diabetes HbA1c (Glycosylated Hemoglobin)',
        code: 'LAB-HBA1C-03',
        category: 'Endocrinology',
        description: 'Measures your average blood sugar level over the past 3 months to monitor and diagnose diabetes.',
        sampleType: 'Blood',
        fastingRequired: false,
        tatHours: 12,
        price: 499,
        mrp: 650,
        discountPercent: 23,
        homeCollectionAvailable: true,
        laboratory: lab._id,
        parametersIncluded: ['HbA1c Percentage', 'Estimated Average Glucose (eAG)']
      },
      {
        name: 'Liver Function Test (LFT Profile)',
        code: 'LAB-LFT-04',
        category: 'Biochemistry',
        description: 'Assesses liver enzyme levels, bilirubin levels, and protein synthesis.',
        sampleType: 'Blood',
        fastingRequired: true,
        tatHours: 24,
        price: 750,
        mrp: 950,
        discountPercent: 21,
        homeCollectionAvailable: true,
        laboratory: lab._id,
        parametersIncluded: ['SGOT (AST)', 'SGPT (ALT)', 'Bilirubin Total', 'Bilirubin Direct', 'Alkaline Phosphatase']
      },
      {
        name: 'Kidney Function Test (KFT / RFT Profile)',
        code: 'LAB-KFT-05',
        category: 'Biochemistry',
        description: 'Checks renal filtration health through blood urea, serum creatinine, and electrolyte balance.',
        sampleType: 'Blood',
        fastingRequired: false,
        tatHours: 24,
        price: 700,
        mrp: 900,
        discountPercent: 22,
        homeCollectionAvailable: true,
        laboratory: lab._id,
        parametersIncluded: ['Blood Urea', 'Serum Creatinine', 'Uric Acid', 'Sodium', 'Potassium']
      }
    ];
    await LabTest.insertMany(labTestsData);
    console.log('✅ Seeded diagnostic lab tests.');

    // 9. Health Packages
    const healthPackagesData = [
      {
        name: 'CareVanta Full Body Master Health Checkup',
        code: 'PKG-MASTER-01',
        description: 'Our most comprehensive diagnostic panel covering 85+ parameters including heart, kidney, liver, thyroid, and vitamin markers.',
        targetAudience: 'Adults aged 25+ seeking annual preventive baseline',
        price: 2499,
        mrp: 5500,
        discountPercent: 54,
        totalTestsCount: 85,
        includedTests: ['Complete Blood Count (CBC)', 'Lipid Profile', 'HbA1c & Fasting Glucose', 'Kidney Function Test', 'Liver Function Test', 'Thyroid Profile (T3, T4, TSH)', 'Vitamin D3 & B12', 'Urine Routine Analysis'],
        consultationsIncluded: ['1 Free Online Video Doctor Consultation', '1 Certified Clinical Dietitian Review'],
        isPopular: true
      },
      {
        name: 'CareVanta Advanced Cardiac Health Shield',
        code: 'PKG-CARDIAC-02',
        description: 'Specialized cardiac risk evaluation designed by expert cardiologists to detect asymptomatic heart disease risks early.',
        targetAudience: 'Individuals with hypertension, stress, or family history of heart disease',
        price: 1999,
        mrp: 3800,
        discountPercent: 47,
        totalTestsCount: 45,
        includedTests: ['Lipid Profile Extended', 'High-Sensitivity CRP (hs-CRP)', 'HbA1c', 'Homocysteine Marker', 'KFT', 'ECG Interpretation'],
        consultationsIncluded: ['1 Senior Cardiologist Teleconsultation'],
        isPopular: true
      }
    ];
    await HealthPackage.insertMany(healthPackagesData);
    console.log('✅ Seeded health packages.');

    // 10. Pre-generate a verified sample report for the patient
    const uploadsDir = path.join(__dirname, '../uploads/reports');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const sampleReportNumber = 'REP-CV-2026-9901';
    const sampleVerifyCode = 'CV-VERIFY-HEALTH99';
    const samplePdfPath = path.join(uploadsDir, `${sampleReportNumber}.pdf`);

    const sampleReportData = {
      reportNumber: sampleReportNumber,
      reportType: 'Complete Blood Count (CBC) Report',
      patient: {
        firstName: patientUser.firstName,
        lastName: patientUser.lastName,
        gender: patientUser.gender,
        bloodGroup: patientUser.bloodGroup,
        _id: patientUser._id
      },
      doctor: { user: { firstName: 'Dipali', lastName: 'Parkhede' }, registrationNumber: 'MCI-CARD-89102' },
      laboratory: lab,
      parameters: [
        { parameterName: 'Hemoglobin', measuredValue: '14.8', unit: 'g/dL', referenceRange: '13.0 - 17.0', interpretation: 'Normal' },
        { parameterName: 'Total Leucocyte Count (TLC)', measuredValue: '7,200', unit: 'cells/cu.mm', referenceRange: '4,000 - 11,000', interpretation: 'Normal' },
        { parameterName: 'Platelet Count', measuredValue: '260,000', unit: '/cu.mm', referenceRange: '150,000 - 450,000', interpretation: 'Normal' },
        { parameterName: 'RBC Count', measuredValue: '5.1', unit: 'mil/cu.mm', referenceRange: '4.5 - 5.5', interpretation: 'Normal' },
        { parameterName: 'ESR (Westergren)', measuredValue: '9', unit: 'mm/1st hr', referenceRange: '0 - 15', interpretation: 'Normal' }
      ],
      clinicalObservations: 'Hematological indices demonstrate robust cellular integrity with optimal hemoglobin oxygen carrying capacity. No evidence of microcytic anemia, leukocytosis, or thrombocytopenia.',
      doctorComments: 'Routine health screening parameters are completely normal. Continue adequate hydration and aerobic fitness.',
      verificationCode: sampleVerifyCode,
      reportGenerationDate: new Date()
    };

    await generateReportPDF(sampleReportData, samplePdfPath);

    await MedicalReport.create({
      reportNumber: sampleReportNumber,
      reportType: sampleReportData.reportType,
      patient: patientUser._id,
      doctor: doctor1._id,
      laboratory: lab._id,
      parameters: sampleReportData.parameters,
      clinicalObservations: sampleReportData.clinicalObservations,
      doctorComments: sampleReportData.doctorComments,
      verificationCode: sampleVerifyCode,
      pdfUrl: `/uploads/reports/${sampleReportNumber}.pdf`,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://carevanta.ai/verify-report/' + sampleVerifyCode)}`,
      status: 'Finalized'
    });

    console.log('✅ Generated Sample PDF Clinical Report with verification QR code.');
    console.log('🎉 CareVanta AI Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
