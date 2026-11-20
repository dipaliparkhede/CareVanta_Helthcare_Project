# CareVanta AI — AI-Powered All-in-One Digital Healthcare Ecosystem
> **Tagline:** *Your Health, Connected. Your Care, Intelligent.*

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Security: ISO 27001 Ready](https://img.shields.io/badge/Security-ISO%2027001%20Ready-teal.svg)](docs/SECURITY.md)
[![Compliance: ABDM Aligned](https://img.shields.io/badge/Compliance-ABDM%20Aligned-orange.svg)](docs/COMPLIANCE.md)

---

## 🏥 Executive Overview

**CareVanta AI** is a production-grade, end-to-end digital healthcare ecosystem connecting **Patients, Doctors, Hospitals, Pharmacies, Diagnostic Laboratories, and Super Administrators** into an intelligent continuum of care. 

Rather than a simple hospital website or doctor appointment directory, CareVanta AI delivers a unified health platform with:
- **Telemedicine & WebRTC HD Consultations** with active doctor notes and real-time chat
- **Digital Prescription Generator** with clinical diagnosis, dosage schedules, and QR code verification
- **Master Online Medical Report Engine** generating downloadable, printable PDFs for 27 clinical report types with cryptographic SHA-256 validation
- **Complete Online Pharmacy** with prescription requirement gating, medicine catalog, cart persistence, and pharmacist verification workflows
- **Accredited Diagnostic Laboratory Management** with home phlebotomy sample collection and digital report delivery
- **AI Health Suite** with emergency symptom triaging, multilingual medical assistant (English, Hindi, Marathi), report biomarker analyzer, and prescription OCR reader
- **Centralized Digital Medical Locker** for private, encrypted historical document archiving
- **Multi-Role Workspaces** tailored for all 6 stakeholder roles

---

## 🎨 Professional Design System

CareVanta AI features an international healthcare SaaS interface designed according to clinical human-factors engineering:

| Role / Element | Palette Hex | Visual Role |
| :--- | :--- | :--- |
| **Primary Navy** | `#123B5D` | Executive headers, sidebar brand, structural dominance |
| **Secondary Blue** | `#247BA0` | Clinical accents, info ribbons, secondary actions |
| **Medical Teal** | `#18A999` | Primary CTA buttons, verified badges, active states |
| **Soft Mint** | `#E8F7F3` | Highlights, badge backgrounds, table headers |
| **Light Canvas** | `#F5F8FC` | Calibrated ergonomic background avoiding eye fatigue |
| **Dark Content** | `#172B3A` | High contrast readable typography (Inter & Manrope) |
| **Success** | `#16A34A` | Normal biomarkers, approved orders |
| **Danger / SOS** | `#DC2626` | 24x7 Ambulance trauma hotlines, emergency warnings |

---

## 🏛️ Ecosystem Architecture

```
                                  +-------------------------------------------------------+
                                  |                 CareVanta AI Frontend                 |
                                  |             React 18 + Vite + Tailwind CSS            |
                                  |             Redux Toolkit + React Router v6           |
                                  +---------------------------+---------------------------+
                                                              |
                                                    REST / WebRTC / Socket.IO
                                                              |
                                  +---------------------------v---------------------------+
                                  |              CareVanta Core Backend API               |
                                  |            Node.js + Express + Socket.IO              |
                                  +-------+-------------------+-------------------+-------+
                                          |                   |                   |
                     +--------------------+                   |                   +--------------------+
                     |                                        |                                        |
+--------------------v--------------------+  +----------------v-------------------+  +-----------------v------------------+
|          Database Layer                 |  |       AI & Document Engine         |  |       Payment & Messaging          |
|  - MongoDB (40+ Mongoose Models)        |  |  - PDFKit Reusable Report Engine   |  |  - Razorpay Gateway Integration    |
|  - Relational indexes & transactions    |  |  - Cryptographic QR Signatures     |  |  - Webhook verification engine     |
|  - Role-based data partition            |  |  - Multilingual AI Triaging (FastAPI)|  |  - Nodemailer Email Service        |
+-----------------------------------------+  +------------------------------------+  +------------------------------------+
```

---

## 🔑 Demo Access Credentials (Pre-Seeded)

The database includes realistic demo accounts across all 6 roles for rapid testing:

| Role / User | Email | Password | Access Highlights |
| :--- | :--- | :--- | :--- |
| **Super Admin (Dipali Parkhede)** | `admin@carevanta.ai` | `Admin@Password123` | Ecosystem revenue charts, audit logs, provider approvals |
| **Doctor (Dr. Dipali Parkhede - Cardiologist)** | `dr.sharma@carevanta.ai` | `Doctor@Password123` | Patient queue, video rooms, issue prescriptions |
| **Doctor (Dr. Dipali Parkhede - Neurologist)** | `dr.ananya@carevanta.ai` | `Doctor@Password123` | Availability management, earnings analytics |
| **Patient (Dipali Parkhede)** | `patient@carevanta.ai` | `Patient@Password123` | EHR dashboard, medical locker, appointments, pharmacy orders |
| **Pharmacist (Dipali Parkhede)** | `pharmacist@carevanta.ai` | `Pharmacy@Password123` | Prescription verification queue, inventory dispatch |
| **Laboratory Admin (Dipali Parkhede)** | `lab@carevanta.ai` | `Lab@Password123` | Sample collection status, publish finalized PDF reports |
| **Hospital Admin (Dipali Parkhede)** | `hospital@carevanta.ai` | `Hospital@Password123` | Bed capacities, department rosters, admission management |

---

## 🚀 Quickstart Installation Guide

### 1. Prerequisites
- **Node.js** v18+ or v24+
- **MongoDB** (Local instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)
- **Python** 3.8+ (for optional AI FastAPI microservice)

### 2. Backend Server Setup
```bash
cd server
npm install
node utils/seed.js    # Seeds demo doctors, medicines, tests, and clinical reports
npm run dev           # Starts API server on http://localhost:5000
```

### 3. Frontend Client Setup
```bash
cd client
npm install
npm run dev           # Starts Vite dev server on http://localhost:5173
```

### 4. Optional AI Microservice Setup
```bash
cd ai-service
pip install -r requirements.txt
python main.py        # Starts FastAPI AI engine on http://localhost:8000
```

---

## 📋 Comprehensive Feature Checklist

### 1. Authentication & Security (Part 5 & 23)
- [x] Multi-role registration (Patient, Doctor, Pharmacist, Lab, Hospital, Admin)
- [x] JWT Token generation with secure refresh token rotation
- [x] Role-Based Access Control (RBAC) route middleware
- [x] Audit logging on all security events (`models/AuditLog.js`)
- [x] Rate limiting, Helmet HTTP headers, Mongo sanitization, CORS

### 2. Online Appointment Booking (Part 8)
- [x] Directory search by specialization, fee range, ratings, and language
- [x] Calendar slot selection with **backend double-booking prevention**
- [x] Automated appointment confirmation notifications

### 3. WebRTC Video Consultation (Part 9)
- [x] Real-time video/audio toggle and encrypted signaling via Socket.IO
- [x] Integrated doctor consultation room with live chat and clinical observations

### 4. Online Digital Pharmacy (Part 10)
- [x] Categorized medicine catalog with prescription gating (`Rx Required`)
- [x] Persistent Redux shopping cart with free delivery threshold logic
- [x] Pharmacist verification queue to approve or reject prescription uploads
- [x] Razorpay payment verification with automated invoice generation

### 5. Master Medical Report Generator (Part 11)
- [x] Reusable PDFKit report engine covering all **27 clinical report types**
- [x] Automated generation of doctor consultation notes, CBC, Lipid, KFT, LFT, and discharge summaries
- [x] Cryptographic SHA-256 verification QR code embedded in every document
- [x] Public authenticity verification portal (`/verify-report/:code`) preserving patient privacy

### 6. Digital Medical Locker (Part 12)
- [x] Category-organized archiving (Prescriptions, Blood Reports, Scans, Discharge Summaries, Insurance)
- [x] Multi-format upload (PDF, JPG, PNG) with size validation and preview

### 7. AI Healthcare Intelligence Suite (Part 14)
- [x] Red-flag emergency symptom triage with hospital trauma redirection
- [x] Multilingual Health Assistant chatbot supporting **English, Hindi, and Marathi**
- [x] Medical report analyzer identifying abnormal biomarkers against reference ranges
- [x] Prescription OCR extractor with mandatory human pharmacist verification notice

---

## 📄 License & Compliance

CareVanta AI is released under the **MIT License**.
Compliant with national telemedicine practice guidelines, statutory pharmacy dispensing regulations, and digital personal data protection principles.
