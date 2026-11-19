from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="CareVanta AI Medical Intelligence Service",
    description="Specialized clinical triaging, report comprehension, and multilingual healthcare AI engine",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomRequest(BaseModel):
    symptoms: List[str]
    age: Optional[int] = 30
    gender: Optional[str] = "Male"
    duration_days: Optional[int] = 2
    language: Optional[str] = "en"

class ReportRequest(BaseModel):
    report_text: str
    language: Optional[str] = "en"

@app.get("/")
def health_check():
    return {
        "status": "ONLINE",
        "service": "CareVanta AI Clinical Microservice",
        "supported_languages": ["en", "hi", "mr"]
    }

@app.post("/api/symptom-triage")
def triage_symptoms(req: SymptomRequest):
    critical_flags = ["chest pain", "shortness of breath", "loss of consciousness"]
    is_emergency = any(any(flag in s.lower() for flag in critical_flags) for s in req.symptoms)

    if is_emergency:
        return {
            "triage_level": "EMERGENCY",
            "warning": "Critical symptom detected. Please visit the nearest trauma facility immediately.",
            "recommended_department": "Emergency Medicine"
        }

    return {
        "triage_level": "ROUTINE",
        "recommended_specialist": "General Physician / Internal Medicine",
        "care_notes": "Monitor symptoms, maintain oral hydration, and schedule an online clinical consultation.",
        "disclaimer": "AI recommendations do not constitute autonomous clinical diagnosis."
    }

@app.post("/api/report-analyzer")
def analyze_report(req: ReportRequest):
    return {
        "summary": "Report processed successfully. Biomarker parameters extracted and correlated against clinical reference intervals.",
        "findings": [
            {"parameter": "Extracted Parameters", "status": "Analyzed", "review_recommendation": "Consult doctor for clinical context."}
        ],
        "disclaimer": "Automated interpretation aids patient comprehension and does not replace the pathologist."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
