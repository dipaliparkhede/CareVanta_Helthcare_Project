# CareVanta AI — REST API Architecture Documentation

Base URL: `http://localhost:5000/api`

### Authentication (`/api/auth`)
- `POST /register`: Register user with role (`patient`, `doctor`, `pharmacist`, `lab_admin`, `hospital_admin`)
- `POST /login`: Authenticate and receive JWT + Refresh Token
- `GET /me`: Fetch authenticated user profile and role details
- `PUT /profile`: Update personal health details, addresses, and emergency contacts

### Doctors (`/api/doctors`)
- `GET /`: Search and filter verified doctors by specialization, fee, ratings
- `GET /:id`: Detailed doctor profile, qualifications, and hospital affiliations
- `GET /stats`: Doctor dashboard stats (total consultations, earnings)
- `PUT /availability`: Update working days, consultation fees, and slot durations

### Appointments (`/api/appointments`)
- `POST /book`: Book consultation slot (includes double-booking prevention)
- `GET /my-appointments`: Patient's scheduled appointments
- `GET /doctor-appointments`: Doctor's upcoming patient queue
- `PATCH /:id/status`: Update appointment status (Confirm, Cancel, Reschedule)

### Online Pharmacy (`/api/medicines`, `/api/cart`, `/api/orders`)
- `GET /medicines`: Browse medicine catalog with category and price filters
- `GET /medicines/:id`: Medicine details with generic alternatives
- `GET /cart`: Fetch user's cart and calculated delivery fees
- `POST /cart/add`: Add medicine to cart
- `POST /orders/create`: Checkout and place pharmacy order
- `GET /orders/my-orders`: Patient order history and tracking
- `PATCH /orders/:id/status`: Pharmacist prescription verification and dispatch

### Medical Reports Engine (`/api/medical-reports`)
- `POST /generate`: Compile official medical report for 27 clinical categories
- `GET /my-reports`: Patient's clinical records
- `GET /verify/:code`: Public cryptographic verification endpoint

### AI Suite (`/api/ai`)
- `POST /symptoms`: AI clinical symptom triage and emergency flag detection
- `POST /chat`: Multilingual medical assistant Q&A
- `POST /analyze-report`: Biomarker extraction and clinical terminology explanation
- `POST /ocr-prescription`: Optical character recognition for prescription items
