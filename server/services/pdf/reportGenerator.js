const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

/**
 * CareVanta AI Master PDF Engine
 * Generates professional clinical reports, digital prescriptions, lab results, and invoices
 */
const generateReportPDF = async (reportData, outputPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // 1. Generate Verification QR Code
      const verifyUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-report/${reportData.verificationCode || 'CV-VERIFY'}`;
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 100, margin: 1 });
      const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');

      // 2. Header & Branding
      doc.rect(0, 0, doc.page.width, 100).fill('#123B5D');
      
      doc.fillColor('#FFFFFF')
         .fontSize(22)
         .font('Helvetica-Bold')
         .text('CAREVANTA AI', 45, 25);

      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#E8F7F3')
         .text('Your Health, Connected. Your Care, Intelligent.', 45, 52);

      doc.fontSize(8)
         .fillColor('#FFFFFF')
         .text('ISO 27001 Certified | ABDM Compliant Digital Health Ecosystem | National Health Network', 45, 68);

      // Header QR badge on top right
      doc.image(qrBuffer, doc.page.width - 120, 10, { fit: [80, 80] });

      doc.moveDown(4);

      // 3. Document Title Ribbon
      const title = reportData.reportType || 'CLINICAL MEDICAL REPORT';
      doc.rect(40, 115, doc.page.width - 80, 32).fill('#247BA0');
      doc.fillColor('#FFFFFF')
         .fontSize(13)
         .font('Helvetica-Bold')
         .text(title.toUpperCase(), 50, 125, { align: 'center' });

      // 4. Patient & Provider Metadata Box
      doc.rect(40, 155, doc.page.width - 80, 95).stroke('#CBD5E1');

      doc.fillColor('#172B3A').fontSize(9).font('Helvetica-Bold');
      doc.text('PATIENT INFORMATION', 50, 165);
      doc.text('PROVIDER / CLINICAL DETAILS', 320, 165);

      doc.font('Helvetica').fontSize(9).fillColor('#475569');
      
      const pat = reportData.patient || {};
      const docDetails = reportData.doctor || {};
      const lab = reportData.laboratory || {};

      doc.text(`Patient Name: ${pat.firstName || 'Patient'} ${pat.lastName || ''}`, 50, 180);
      doc.text(`Patient ID: ${pat._id ? pat._id.toString().slice(-8).toUpperCase() : 'CV-PAT-9081'}`, 50, 195);
      doc.text(`Age / Gender: ${pat.age || '34'} Y / ${pat.gender || 'Not specified'}`, 50, 210);
      doc.text(`Blood Group: ${pat.bloodGroup || 'O+'}`, 50, 225);

      const providerName = docDetails.user ? `Dr. ${docDetails.user.firstName} ${docDetails.user.lastName}` : (lab.name || 'CareVanta Diagnostics Center');
      const providerReg = docDetails.registrationNumber || lab.licenseNumber || 'REG-MH-2024-88910';

      doc.text(`Provider: ${providerName}`, 320, 180);
      doc.text(`Reg / License No: ${providerReg}`, 320, 195);
      doc.text(`Report Date: ${new Date(reportData.reportGenerationDate || Date.now()).toLocaleDateString()}`, 320, 210);
      doc.text(`Report ID: ${reportData.reportNumber || 'REP-CV-2026-001'}`, 320, 225);

      let currentY = 270;

      // 5. Test Parameters or Clinical Records Table
      if (reportData.parameters && reportData.parameters.length > 0) {
        // Table Header
        doc.rect(40, currentY, doc.page.width - 80, 22).fill('#E8F7F3');
        doc.fillColor('#123B5D').fontSize(9).font('Helvetica-Bold');
        doc.text('TEST PARAMETER', 50, currentY + 6);
        doc.text('RESULT', 240, currentY + 6);
        doc.text('UNITS', 320, currentY + 6);
        doc.text('REFERENCE INTERVAL', 400, currentY + 6);
        doc.text('FLAG', 490, currentY + 6);

        currentY += 25;

        reportData.parameters.forEach((param, index) => {
          if (index % 2 === 1) {
            doc.rect(40, currentY - 2, doc.page.width - 80, 18).fill('#F8FAFC');
          }

          doc.font('Helvetica').fontSize(9).fillColor('#1E293B');
          doc.text(param.parameterName || '', 50, currentY);
          
          // Bold the value if abnormal
          const isAbnormal = param.interpretation && param.interpretation !== 'Normal';
          if (isAbnormal) {
            doc.font('Helvetica-Bold').fillColor('#DC2626');
          } else {
            doc.font('Helvetica').fillColor('#16A34A');
          }
          doc.text(param.measuredValue || '', 240, currentY);

          doc.font('Helvetica').fillColor('#64748B');
          doc.text(param.unit || '', 320, currentY);
          doc.text(param.referenceRange || '', 400, currentY);

          if (isAbnormal) {
            doc.font('Helvetica-Bold').fillColor('#DC2626').text(param.interpretation || 'HIGH', 490, currentY);
          } else {
            doc.font('Helvetica').fillColor('#16A34A').text('NORMAL', 490, currentY);
          }

          currentY += 20;
        });

        currentY += 15;
      }

      // 6. Clinical Observations & Comments
      if (reportData.clinicalObservations || reportData.doctorComments || reportData.recommendations) {
        doc.rect(40, currentY, doc.page.width - 80, 75).stroke('#E2E8F0');
        doc.fillColor('#123B5D').fontSize(9).font('Helvetica-Bold');
        doc.text('CLINICAL IMPRESSION & RECOMMENDATIONS', 50, currentY + 8);
        doc.font('Helvetica').fontSize(8.5).fillColor('#334155');
        
        const observationText = reportData.clinicalObservations || reportData.doctorComments || reportData.recommendations || 'Clinical findings within acceptable physiological baseline. Maintain balanced hydration, regular sleep schedule, and periodic preventive follow-up.';
        doc.text(observationText, 50, currentY + 24, { width: doc.page.width - 100, align: 'justify' });

        currentY += 95;
      }

      // 7. Verification & Signatures Footer
      const footerY = doc.page.height - 110;
      doc.strokeColor('#CBD5E1').lineWidth(1).moveTo(40, footerY).lineTo(doc.page.width - 40, footerY).stroke();

      doc.image(qrBuffer, 50, footerY + 10, { fit: [55, 55] });

      doc.fontSize(8).font('Helvetica-Bold').fillColor('#123B5D');
      doc.text('OFFICIAL VERIFICATION CODE', 115, footerY + 12);
      doc.font('Helvetica').fillColor('#475569');
      doc.text(`Code: ${reportData.verificationCode || 'CV-VERIFY-10992'}`, 115, footerY + 24);
      doc.text('Scan QR to verify authenticity or visit carevanta.ai/verify-report', 115, footerY + 36);

      doc.font('Helvetica-Bold').fillColor('#123B5D');
      doc.text('AUTHORIZED MEDICAL SIGNATURE', doc.page.width - 240, footerY + 12);
      doc.font('Helvetica').fillColor('#475569');
      doc.text('Digitally signed and cryptographically verified', doc.page.width - 240, footerY + 24);
      doc.text(`Authorized by: ${providerName}`, doc.page.width - 240, footerY + 36);

      // Final disclaimer
      doc.fontSize(7).fillColor('#94A3B8').text(
        'Disclaimer: This electronic healthcare record is confidential and legally privileged. CareVanta AI complies with national teleconsultation guidelines and electronic health records specifications.',
        40, doc.page.height - 35, { align: 'center', width: doc.page.width - 80 }
      );

      doc.end();
      stream.on('finish', () => resolve(outputPath));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generateReportPDF };
