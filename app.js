/**
 * Shree J Hospital & Maternity Care (श्रीजे हॉस्पिटल)
 * Slogan: "श्रीजे शी अनुबंध, आजाराला प्रतिबंध"
 * Bibwewadi, Pune - 411037
 * 
 * Core Features:
 * - Bibwewadi OPD Live Hours & Status Indicator
 * - Digital Payment Desk & Instant Receipt Simulator (From Old Site)
 * - 3-Step Appointment Booking Wizard & Token Pass Generator
 * - Specialized Department Filtering (All 7 Departments from Old Site)
 * - Smart Symptom Triage for Dr. Rajeev Joshi & Dr. Manasi Joshi
 * - Online Diagnostic & Antenatal Report Lookup
 * - Dark / Light Mode Switcher & Responsive Ergonomics
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initClinicLiveHours();
  initClientBrandingTool();
  initNavigation();
  initServiceFilters();
  initSmartTriage();
  initLabReports();
  initAppointmentBookingWizard();
  initDigitalPaymentDesk();
  initInquiryForm();
});

/* ==========================================================================
   1. LIVE HOSPITAL HOURS & STATUS (BIBWEWADI OPD)
   ========================================================================== */
function initClinicLiveHours() {
  const statusIndicator = document.getElementById('liveStatusText');
  const scheduleItems = document.querySelectorAll('.schedule-item');

  const now = new Date();
  const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday...
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeVal = currentHour + currentMinute / 60;

  // Highlight today's row in schedule table
  scheduleItems.forEach(item => {
    if (parseInt(item.getAttribute('data-day'), 10) === currentDay) {
      item.classList.add('current-day');
    }
  });

  // Calculate live open/closed status for Bibwewadi OPD
  let statusMessage = '';

  if (currentDay >= 1 && currentDay <= 6) {
    // Mon - Sat: Morning 10:00 AM - 1:30 PM & Evening 6:00 PM - 9:00 PM
    if (currentTimeVal >= 10.0 && currentTimeVal < 13.5) {
      statusMessage = 'Morning OPD Active (10:00 AM – 1:30 PM) • Doctors on Duty';
    } else if (currentTimeVal >= 18.0 && currentTimeVal < 21.0) {
      statusMessage = 'Evening OPD Active (6:00 PM – 9:00 PM) • Walk-ins Welcomed';
    } else if (currentTimeVal >= 13.5 && currentTimeVal < 18.0) {
      statusMessage = 'Afternoon Break • Evening OPD resumes at 6:00 PM (Emergency 24x7)';
    } else {
      statusMessage = 'Night Hours • 24x7 Maternity & Emergency Helpline Active';
    }
  } else if (currentDay === 0) {
    // Sunday: 10:00 AM - 12:30 PM (Emergency 24x7)
    if (currentTimeVal >= 10.0 && currentTimeVal < 12.5) {
      statusMessage = 'Sunday Morning OPD Active (10:00 AM – 12:30 PM) • Emergency Desk 24x7';
    } else {
      statusMessage = 'Emergency Desk Only Today (Sunday OPD Concluded • Maternity 24x7)';
    }
  }

  if (statusIndicator) {
    statusIndicator.textContent = statusMessage;
  }
}

/**
 * Unambiguous Date Formatter (outputs e.g. "11 Oct 2026")
 */
function formatDateToReadable(dateStr) {
  if (!dateStr) return '';
  const parts = String(dateStr).split('T')[0].split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[monthIndex]} ${year}`;
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const day = d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  return dateStr;
}

/* ==========================================================================
   2. CLIENT PREVIEW & BRANDING TOOLBAR
   ========================================================================== */
function initClientBrandingTool() {
  const brandingBar = document.getElementById('demoBrandingBar');
  const clinicInput = document.getElementById('customClinicNameInput');
  const applyBtn = document.getElementById('applyClinicNameBtn');
  const resetBtn = document.getElementById('resetClinicNameBtn');
  const hideBtn = document.getElementById('hideDemoBarBtn');
  const restoreBtn = document.getElementById('restoreDemoBarBtn');

  const defaultName = 'श्रीजे हॉस्पिटल (Shree J Hospital)';
  const savedName = localStorage.getItem('sjh_title');

  if (savedName) {
    updateAllClinicNames(savedName);
    if (clinicInput) clinicInput.value = savedName;
  }

  function updateAllClinicNames(name) {
    const finalName = name.trim() || defaultName;
    document.querySelectorAll('.dynamic-clinic-name').forEach(el => {
      el.textContent = finalName;
    });
    document.title = `${finalName} | Bibwewadi, Pune`;
  }

  if (applyBtn && clinicInput) {
    applyBtn.addEventListener('click', () => {
      const val = clinicInput.value.trim() || defaultName;
      localStorage.setItem('sjh_title', val);
      updateAllClinicNames(val);
      showToast(`Title updated to "${val}"!`, 'success');
    });

    clinicInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') applyBtn.click();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('sjh_title');
      if (clinicInput) clinicInput.value = defaultName;
      updateAllClinicNames(defaultName);
      showToast('Title reset to Shree J Hospital.', 'info');
    });
  }

  if (hideBtn && brandingBar && restoreBtn) {
    hideBtn.addEventListener('click', () => {
      brandingBar.classList.add('hidden');
      restoreBtn.classList.add('visible');
    });

    restoreBtn.addEventListener('click', () => {
      brandingBar.classList.remove('hidden');
      restoreBtn.classList.remove('visible');
    });
  }
}

/* ==========================================================================
   3. THEME TOGGLE (LIGHT / DARK MODE)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const toggleLabel = document.getElementById('themeToggleLabel');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('sjh_theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('sjh_theme', next);
      updateThemeButton(next);
      showToast(`Switched to ${next === 'dark' ? 'Dark Mode' : 'Light Mode'}`, 'info');
    });
  }

  function updateThemeButton(theme) {
    if (!toggleLabel) return;
    toggleLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }
}

/* ==========================================================================
   4. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('siteHeader');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isOpen = mainNav.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   5. SERVICE & SPECIALTY CATEGORY FILTERING (ALL 7 DEPARTMENTS)
   ========================================================================== */
function initServiceFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Hook "Book Slot" buttons inside service cards to open booking wizard
  document.querySelectorAll('.book-service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dept = btn.getAttribute('data-dept');
      const doc = btn.getAttribute('data-doc');
      openBookingModalWithPreselection(dept, doc);
    });
  });

  // Hook "Book with Dr. X" buttons inside doctor cards
  document.querySelectorAll('.select-doctor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const doctor = btn.getAttribute('data-doctor');
      const dept = btn.getAttribute('data-dept');
      openBookingModalWithPreselection(dept, doctor);
    });
  });
}

/* ==========================================================================
   6. SMART SYMPTOM TRIAGE (CUSTOMIZED FOR SHREE J HOSPITAL)
   ========================================================================== */
function initSmartTriage() {
  const chips = document.querySelectorAll('.symptom-chip');
  const nextToStep2Btn = document.getElementById('triageNextToStep2');
  const backToStep1Btn = document.getElementById('triageBackToStep1');
  const submitTriageBtn = document.getElementById('triageSubmitBtn');
  const restartBtn = document.getElementById('triageRestartBtn');
  const bookNowBtn = document.getElementById('triageBookNowBtn');

  const step1 = document.getElementById('triageStep1');
  const step2 = document.getElementById('triageStep2');
  const step3 = document.getElementById('triageStep3');

  const ind1 = document.getElementById('triageStepIndicator1');
  const ind2 = document.getElementById('triageStepIndicator2');
  const ind3 = document.getElementById('triageStepIndicator3');

  const recDeptEl = document.getElementById('triageRecommendedDept');
  const recDocEl = document.getElementById('triageRecommendedDoctor');
  const recTextEl = document.getElementById('triageRecommendationText');
  const recTimeEl = document.getElementById('triageRecommendedTime');

  let selectedSymptomData = null;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');

      selectedSymptomData = {
        title: chip.textContent.trim(),
        dept: chip.getAttribute('data-dept'),
        doc: chip.getAttribute('data-doc'),
        cat: chip.getAttribute('data-category')
      };

      if (nextToStep2Btn) nextToStep2Btn.disabled = false;
    });
  });

  if (nextToStep2Btn) {
    nextToStep2Btn.addEventListener('click', () => {
      step1.classList.remove('active');
      step2.classList.add('active');
      ind1.classList.remove('active');
      ind2.classList.add('active');
    });
  }

  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', () => {
      step2.classList.remove('active');
      step1.classList.add('active');
      ind2.classList.remove('active');
      ind1.classList.add('active');
    });
  }

  if (submitTriageBtn) {
    submitTriageBtn.addEventListener('click', () => {
      if (!selectedSymptomData) return;

      const durationRadio = document.querySelector('input[name="duration"]:checked');
      const durationVal = durationRadio ? durationRadio.value : 'A few days';

      recDeptEl.textContent = selectedSymptomData.dept;
      recDocEl.textContent = selectedSymptomData.doc;
      
      let guidance = '';
      if (selectedSymptomData.cat === 'pediatrics') {
        guidance = `For child illness concerns lasting ${durationVal}, a physical examination by Senior Pediatrician Dr. Rajeev Joshi is advised to check chest, throat, and vital signs.`;
        recTimeEl.textContent = 'Pediatric OPD Today: 10:00 AM – 1:30 PM & 6:00 PM – 9:00 PM';
      } else if (selectedSymptomData.cat === 'vaccination') {
        guidance = `Vaccination appointments are conducted under Dr. Rajeev Joshi's supervision with cold-chain certified vaccines per IAP schedules.`;
        recTimeEl.textContent = 'Vaccination Desk: Open daily in morning and evening OPD';
      } else if (selectedSymptomData.cat === 'obstetrics') {
        guidance = `For antenatal checks, ultrasound reviews, or pregnancy guidance, Dr. Manasi Joshi provides specialized maternity consultation and fetal assessment.`;
        recTimeEl.textContent = 'Maternity OPD: 10:30 AM – 2:00 PM & 6:30 PM – 8:30 PM (24x7 Delivery)';
      } else if (selectedSymptomData.cat === 'gynecology') {
        guidance = `Gynecological conditions such as PCOD, irregular cycles, or pelvic discomfort for ${durationVal} will benefit from a dedicated sonography and hormonal evaluation by Dr. Manasi Joshi.`;
        recTimeEl.textContent = 'Gynecology OPD Today: Morning & Evening slots open';
      } else if (selectedSymptomData.cat === 'laparoscopy') {
        guidance = `For ovarian cysts, fibroids, or laparoscopic surgery evaluation, Dr. Manasi Joshi and the surgical team conduct specialized minimally invasive consultations.`;
        recTimeEl.textContent = 'Laparoscopy Evaluation: Prior appointment recommended';
      } else {
        guidance = `For surgical conditions such as hernia or daycare procedures, our surgical unit provides pre-operative assessments and surgical planning.`;
        recTimeEl.textContent = 'Surgical OPD: Monday to Saturday by appointment';
      }

      recTextEl.textContent = guidance;

      step2.classList.remove('active');
      step3.classList.add('active');
      ind2.classList.remove('active');
      ind3.classList.add('active');
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('selected'));
      selectedSymptomData = null;
      if (nextToStep2Btn) nextToStep2Btn.disabled = true;

      step3.classList.remove('active');
      step1.classList.add('active');
      ind3.classList.remove('active');
      ind1.classList.add('active');
    });
  }

  if (bookNowBtn) {
    bookNowBtn.addEventListener('click', () => {
      if (selectedSymptomData) {
        openBookingModalWithPreselection(selectedSymptomData.dept, selectedSymptomData.doc);
      } else {
        openBookingModal();
      }
    });
  }
}

/* ==========================================================================
   7. LAB REPORT LOOKUP (SHREE J HOSPITAL SAMPLES)
   ========================================================================== */
const sampleLabReports = {
  'SJH-8491': {
    name: 'Mrs. Pooja K. Deshmukh',
    age: '28 Yrs / Female',
    doctor: 'Dr. Manasi Joshi, MS (OB/GYN)',
    date: '11 Oct 2026, 09:15 AM',
    testName: 'Antenatal Profile & Fetal Health Screening',
    rows: [
      { test: 'Hemoglobin (Hb)', val: '12.4', unit: 'g/dL', range: '11.5 - 14.5', status: 'Normal' },
      { test: 'Blood Group & Rh Type', val: 'O Positive', unit: '-', range: 'Documented', status: 'Normal' },
      { test: 'Fasting Blood Sugar (FBS)', val: '86', unit: 'mg/dL', range: '70 - 95', status: 'Normal' },
      { test: 'Serum TSH (Thyroid)', val: '2.10', unit: 'uIU/mL', range: '0.40 - 2.50 (1st Trim)', status: 'Normal' },
      { test: 'Urine Routine (Albumin/Sugar)', val: 'Nil / Absent', unit: '-', range: 'Negative', status: 'Normal' },
      { test: 'VDRL / HBsAg / HIV Screen', val: 'Non-Reactive', unit: '-', range: 'Non-Reactive', status: 'Normal' }
    ]
  },
  'SJH-3920': {
    name: 'Master Aarav S. Joshi',
    age: '3 Yrs / Male',
    doctor: 'Dr. Rajeev Joshi, MD (Pediatrics)',
    date: '10 Oct 2026, 11:30 AM',
    testName: 'Pediatric Complete Blood Count & Fever Screen',
    rows: [
      { test: 'Total Leukocyte Count (WBC)', val: '6,800', unit: '/mcL', range: '5,000 - 12,000', status: 'Normal' },
      { test: 'Platelet Count', val: '280,000', unit: '/mcL', range: '150,000 - 450,000', status: 'Normal' },
      { test: 'Hemoglobin (Hb)', val: '12.8', unit: 'g/dL', range: '11.0 - 14.0', status: 'Normal' },
      { test: 'C-Reactive Protein (CRP)', val: '2.4', unit: 'mg/L', range: '< 6.0', status: 'Normal' },
      { test: 'Malarial Parasite (Smear & Ag)', val: 'Negative', unit: '-', range: 'Negative', status: 'Normal' }
    ]
  },
  'SJH-1102': {
    name: 'Mrs. Sunita More',
    age: '34 Yrs / Female',
    doctor: 'Dr. Manasi Joshi, MS (OB/GYN)',
    date: '09 Oct 2026, 10:00 AM',
    testName: 'Gynecological Hormonal & Thyroid Assessment',
    rows: [
      { test: 'TSH (Thyroid Stimulating)', val: '2.65', unit: 'uIU/mL', range: '0.40 - 4.50', status: 'Normal' },
      { test: 'Serum Prolactin', val: '14.2', unit: 'ng/mL', range: '4.8 - 23.3', status: 'Normal' },
      { test: 'Anti-Müllerian Hormone (AMH)', val: '2.8', unit: 'ng/mL', range: '1.5 - 4.0', status: 'Normal' },
      { test: 'LH / FSH Ratio', val: '1.1', unit: '-', range: '< 2.0', status: 'Normal' }
    ]
  }
};

function initLabReports() {
  const form = document.getElementById('labLookupForm');
  const input = document.getElementById('labReportIdInput');
  const pills = document.querySelectorAll('.id-pill');
  const tableBody = document.getElementById('reportTableBody');
  const printBtn = document.getElementById('printReportBtn');
  const downloadBtn = document.getElementById('downloadReportBtn');

  renderLabReport('SJH-8491');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const id = pill.getAttribute('data-id');
      if (input) input.value = id;
      renderLabReport(id);
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim().toUpperCase();
      renderLabReport(query);
    });
  }

  function renderLabReport(reportId) {
    const data = sampleLabReports[reportId];

    if (!data) {
      showToast(`Report ID "${reportId}" not found. Try SJH-8491, SJH-3920, or SJH-1102.`, 'info');
      return;
    }

    document.getElementById('repPatientName').textContent = data.name;
    document.getElementById('repPatientAge').textContent = data.age;
    document.getElementById('repSampleId').textContent = reportId;
    document.getElementById('repDoctor').textContent = data.doctor;
    document.getElementById('repDate').textContent = data.date;

    tableBody.innerHTML = '';
    data.rows.forEach(row => {
      const tr = document.createElement('tr');
      const isNormal = row.status === 'Normal';
      tr.innerHTML = `
        <td><strong>${row.test}</strong></td>
        <td><strong>${row.val}</strong></td>
        <td>${row.unit}</td>
        <td>${row.range}</td>
        <td>
          <span class="${isNormal ? 'badge-status-normal' : 'badge-status-alert'}">
            ${row.status}
          </span>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    showToast(`Loaded verified report for ${data.name}.`, 'success');
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast('Downloading verified Shree J Hospital digital report PDF...', 'success');
    });
  }
}

/* ==========================================================================
   8. DIGITAL PAYMENT DESK (UPGRADE FROM OLD SITE "MAKE PAYMENT")
   ========================================================================== */
function initDigitalPaymentDesk() {
  const modalBackdrop = document.getElementById('paymentModalBackdrop');
  const closeBtn = document.getElementById('closePaymentModalBtn');
  const openBtns = [
    document.getElementById('openPaymentModalBtn'),
    document.getElementById('heroPayBtn'),
    document.getElementById('bannerPayBtn'),
    document.getElementById('mobilePayBtn')
  ];

  const paymentForm = document.getElementById('digitalPaymentForm');
  const receiptPanel = document.getElementById('paymentReceiptPanel');
  const printReceiptBtn = document.getElementById('printReceiptBtn');
  const closeReceiptBtn = document.getElementById('closeReceiptBtn');

  openBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => openPaymentModal());
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closePaymentModal());
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closePaymentModal();
  });

  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('payPatientName').value.trim();
      const purpose = document.getElementById('payPurposeSelect').value;
      const amount = document.getElementById('payAmount').value;
      const mode = document.querySelector('input[name="payMethod"]:checked')?.value || 'UPI Instant';

      const randomTxn = 'TXN-SJH-' + Math.floor(10000 + Math.random() * 89999);
      const now = new Date();
      const dateStr = formatDateToReadable(now.toISOString().split('T')[0]) + ', ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      document.getElementById('rcptTxnId').textContent = randomTxn;
      document.getElementById('rcptDateTime').textContent = dateStr;
      document.getElementById('rcptPatientName').textContent = patientName;
      document.getElementById('rcptPurpose').textContent = purpose;
      document.getElementById('rcptAmount').textContent = `₹${parseFloat(amount).toFixed(2)}`;
      document.getElementById('rcptMode').textContent = mode;

      paymentForm.style.display = 'none';
      receiptPanel.style.display = 'block';

      showToast(`Payment of ₹${amount} successful! Digital receipt generated.`, 'success');
    });
  }

  if (printReceiptBtn) {
    printReceiptBtn.addEventListener('click', () => window.print());
  }

  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener('click', () => {
      closePaymentModal();
      paymentForm.reset();
      paymentForm.style.display = 'block';
      receiptPanel.style.display = 'none';
    });
  }

  function openPaymentModal() {
    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePaymentModal() {
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   9. APPOINTMENT BOOKING FLOW & MODAL WIZARD
   ========================================================================== */
function initAppointmentBookingWizard() {
  const modalBackdrop = document.getElementById('bookingModalBackdrop');
  const closeBtn = document.getElementById('closeBookingModalBtn');
  const openBtns = [
    document.getElementById('openBookingModalBtn'),
    document.getElementById('heroBookBtn'),
    document.getElementById('mobileBookBtn')
  ];

  const heroSearchForm = document.getElementById('heroQuickSearchForm');
  const quickDeptSelect = document.getElementById('quickDeptSelect');
  const quickDoctorSelect = document.getElementById('quickDoctorSelect');
  const quickDateInput = document.getElementById('quickDateInput');

  const todayStr = new Date().toISOString().split('T')[0];
  if (quickDateInput) {
    quickDateInput.min = todayStr;
    quickDateInput.value = todayStr;
  }

  const modalDateInput = document.getElementById('modalDateInput');
  if (modalDateInput) {
    modalDateInput.min = todayStr;
    modalDateInput.value = todayStr;
  }

  const panel1 = document.getElementById('wizardPanel1');
  const panel2 = document.getElementById('wizardPanel2');
  const panel3 = document.getElementById('wizardPanel3');
  const panelSuccess = document.getElementById('wizardPanelSuccess');

  const node1 = document.getElementById('wizardNode1');
  const node2 = document.getElementById('wizardNode2');
  const node3 = document.getElementById('wizardNode3');

  const nextTo2 = document.getElementById('wizardNextToStep2');
  const backTo1 = document.getElementById('wizardBackToStep1');
  const nextTo3 = document.getElementById('wizardNextToStep3');
  const backTo2 = document.getElementById('wizardBackToStep2');
  const bookingForm = document.getElementById('appointmentBookingForm');

  const modalDept = document.getElementById('modalDeptSelect');
  const modalDoctor = document.getElementById('modalDoctorSelect');
  const timeSlotsContainer = document.getElementById('timeSlotsGrid');
  const hiddenTimeSlot = document.getElementById('selectedTimeSlot');

  const printPassBtn = document.getElementById('printAppointmentPassBtn');
  const closeSuccessBtn = document.getElementById('closeSuccessPassBtn');

  // Real Shree J Hospital OPD Slots (Morning & Evening sessions)
  const standardSlots = [
    '10:00 AM (Morning OPD)', '10:30 AM (Morning OPD)', '11:00 AM (Morning OPD)', 
    '11:30 AM (Morning OPD)', '12:15 PM (Morning OPD)', '01:00 PM (Morning OPD)',
    '06:00 PM (Evening OPD)', '06:30 PM (Evening OPD)', '07:15 PM (Evening OPD)',
    '07:45 PM (Evening OPD)', '08:15 PM (Evening OPD)', '08:45 PM (Evening OPD)'
  ];

  function populateTimeSlots() {
    timeSlotsContainer.innerHTML = '';
    hiddenTimeSlot.value = standardSlots[1];

    standardSlots.forEach((slot, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `time-slot-btn ${index === 1 ? 'selected' : ''}`;
      btn.textContent = slot;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        hiddenTimeSlot.value = slot;
      });
      timeSlotsContainer.appendChild(btn);
    });
  }

  populateTimeSlots();

  openBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => openBookingModal());
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeBookingModal());
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeBookingModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeBookingModal();
    }
  });

  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dept = quickDeptSelect.value;
      const doctor = quickDoctorSelect.value;
      const date = quickDateInput.value;

      openBookingModal();
      if (dept && modalDept) modalDept.value = dept;
      if (doctor && modalDoctor) modalDoctor.value = doctor;
      if (date && modalDateInput) modalDateInput.value = date;

      goToWizardStep(2);
    });
  }

  if (nextTo2) {
    nextTo2.addEventListener('click', () => {
      if (!modalDept.value) {
        showToast('Please select a hospital department.', 'info');
        modalDept.focus();
        return;
      }
      if (!modalDoctor.value) {
        showToast('Please select consulting doctor.', 'info');
        modalDoctor.focus();
        return;
      }
      goToWizardStep(2);
    });
  }

  if (backTo1) {
    backTo1.addEventListener('click', () => goToWizardStep(1));
  }

  if (nextTo3) {
    nextTo3.addEventListener('click', () => {
      if (!modalDateInput.value) {
        showToast('Please choose a consultation date.', 'info');
        return;
      }
      if (!hiddenTimeSlot.value) {
        showToast('Please select an OPD time slot.', 'info');
        return;
      }
      updateSummaryPreview();
      goToWizardStep(3);
    });
  }

  if (backTo2) {
    backTo2.addEventListener('click', () => goToWizardStep(2));
  }

  function updateSummaryPreview() {
    const summaryBox = document.getElementById('bookingSummaryPreview');
    const consultType = document.querySelector('input[name="consultMode"]:checked')?.value || 'Hospital Visit';
    summaryBox.innerHTML = `
      <strong>OPD Appointment:</strong> ${modalDoctor.value} (${modalDept.value}) on 
      <strong>${formatDateToReadable(modalDateInput.value)}</strong> at <strong>${hiddenTimeSlot.value}</strong> • ${consultType}
    `;
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const patientName = document.getElementById('patientFullName').value.trim();
      const doctorName = modalDoctor.value;
      const deptName = modalDept.value;
      const selectedDate = modalDateInput.value;
      const selectedTime = hiddenTimeSlot.value;

      const randomToken = Math.floor(10 + Math.random() * 89);
      const randomRef = Math.floor(1000 + Math.random() * 9000);

      document.getElementById('passTokenBadge').textContent = `Token #SJH-${randomToken}`;
      document.getElementById('passPatientName').textContent = patientName;
      document.getElementById('passBookingRef').textContent = `SJH-2026-${randomRef}`;
      document.getElementById('passDoctorName').textContent = doctorName;
      document.getElementById('passDeptName').textContent = deptName;
      document.getElementById('passDate').textContent = formatDateToReadable(selectedDate);
      document.getElementById('passTime').textContent = selectedTime;

      panel1.classList.remove('active');
      panel2.classList.remove('active');
      panel3.classList.remove('active');
      panelSuccess.classList.add('active');

      document.querySelector('.modal-wizard-steps').style.display = 'none';

      showToast(`Appointment confirmed for ${patientName}! Token #SJH-${randomToken} generated.`, 'success');
    });
  }

  if (printPassBtn) {
    printPassBtn.addEventListener('click', () => window.print());
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      closeBookingModal();
      resetWizard();
    });
  }

  function goToWizardStep(stepNum) {
    panel1.classList.toggle('active', stepNum === 1);
    panel2.classList.toggle('active', stepNum === 2);
    panel3.classList.toggle('active', stepNum === 3);

    node1.classList.toggle('active', stepNum >= 1);
    node2.classList.toggle('active', stepNum >= 2);
    node3.classList.toggle('active', stepNum >= 3);
  }

  function resetWizard() {
    goToWizardStep(1);
    bookingForm.reset();
    document.querySelector('.modal-wizard-steps').style.display = 'grid';
    panelSuccess.classList.remove('active');
    populateTimeSlots();
  }

  window.openBookingModal = function() {
    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeBookingModal = function() {
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  window.openBookingModalWithPreselection = function(dept, doctor) {
    openBookingModal();
    if (dept && modalDept) modalDept.value = dept;
    if (doctor && modalDoctor) modalDoctor.value = doctor;
    goToWizardStep(2);
  };
}

/* ==========================================================================
   10. QUICK CONTACT & INQUIRY FORM
   ========================================================================== */
function initInquiryForm() {
  const form = document.getElementById('quickContactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      form.reset();
      showToast(`Thank you, ${name}! Your inquiry has been routed to Shree J Hospital reception. We will call you back shortly.`, 'success');
    });
  }
}

/* ==========================================================================
   11. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvg = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
