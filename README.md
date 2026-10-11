# 🏥 Shree J Hospital — Smart Clinic Management & OPD Portal
### *श्रीजे शी अनुबंध, आजाराला प्रतिबंध* (Bonding with Shree J, Prevention of Disease)

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-brightgreen?style=for-the-badge&logo=github)](https://gittkhushal.github.io/Smart-Clinic-Management-OPD-Portal/)
[![Client](https://img.shields.io/badge/Client-Shree_J_Hospital_(Pune)-10b981?style=for-the-badge&logo=google-maps)](https://gittkhushal.github.io/Smart-Clinic-Management-OPD-Portal/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## 📌 Project Overview

**Smart Clinic Management & OPD Portal** is a production-ready, client-facing healthcare web portal developed for **Shree J Hospital (श्रीजे हॉस्पिटल)**, a trusted multi-specialty maternal and child healthcare center located in **Bibwewadi, Pune (Maharashtra, India)**.

This project modernizes the clinic's patient intake process by transforming traditional paper registrations into an automated, interactive digital experience—featuring live OPD status tracking, an appointment booking wizard, symptom triage, lab report lookups, and instant UPI billing.

> **Dual Purpose:** Developed as a real-world client pitch for Shree J Hospital and an advanced **Web Technology** course project showcasing modern, responsive Vanilla Web engineering.

---

## 🌐 Live Demo & Interactive Preview

- **GitHub Pages:** [https://gittkhushal.github.io/Smart-Clinic-Management-OPD-Portal/](https://gittkhushal.github.io/Smart-Clinic-Management-OPD-Portal/)
- **Target Location:** Bibwewadi Kondhwa Road, Opp. Talera Park, Pune – 411037
- **Helpline:** `+91 98220 12345` / `(020) 2421 8899`

---

## ✨ Key Features & Functionality

### 1. 🕒 Dynamic OPD Status Engine
- Automatically computes real-time clinic availability based on IST (Indian Standard Time).
- Clearly communicates weekday morning/evening consultation shifts (`10:00 AM – 1:00 PM` and `6:00 PM – 9:00 PM`).
- Synchronized Sunday emergency protocol (`9:00 AM – 2:00 PM Emergency Desk Only`) to eliminate patient confusion.

### 2. 📅 Interactive Appointment Wizard & Token Generator
- Step-by-step appointment scheduling with physician routing.
- Automatically computes next valid clinic dates formatted clearly (e.g., `11 Oct 2026`).
- Instant generation of printable digital OPD passes with unique Token IDs (e.g., `SJH-2026-9481`), estimated queue times (~15 mins), and department tags.

### 3. 🩺 Intelligent Symptom Triage Router
- Interactive self-assessment tool directing patients directly to the appropriate doctor:
  - **Pediatric & Newborn wing:** Dr. Rajeev Joshi
  - **Obstetrics, Infertility & Laparoscopy:** Dr. Manasi Joshi
  - **Day-Care & General Surgery wing**

### 4. 🧪 Lab Report & Token Lookup
- Instant patient test result portal matching exact hospital sample formats (`LAB-8491`, `LAB-3920`, `LAB-9104`).
- Visual status indicators (Ready / In Analysis) with direct download options.

### 5. 💳 Digital Payment Desk (UPI Integration)
- Dynamic QR code generation for the hospital's registered UPI VPA (`shreejhospital@upi`).
- Supports consultation fees (₹600) and emergency desk fees (₹900).
- Emits instant verified digital receipts with transaction timestamps and clinic authorization stamps.

### 6. 📍 Authentic Local Presence & Accessibility
- Embedded interactive Google Map focused on Bibwewadi Kondhwa Road, Pune.
- Bilingual branding incorporating the hospital's authentic Devanagari calligraphy logo.
- Dark / Light theme toggle with smooth glassmorphism styling and zero screen flicker.

---

## 👨‍⚕️ Medical Specialists & Clinical Wings

| Specialist | Qualifications & Registration | Primary Focus & Departments |
| :--- | :--- | :--- |
| **Dr. Rajeev Joshi** | MBBS, MD (Pediatrics), LLB<br>Fellow Biomedical Informatics<br>*Reg: MMC 48291 / IAP Fellow* | • General Pediatrics & Neonatal Care<br>• Pediatric Immunization & Growth Tracking<br>• Medicolegal & Healthcare Informatics |
| **Dr. Manasi Joshi** | MBBS, DGO, MS/DNB (OB/GYN)<br>Laparoscopic & Infertility Specialist<br>*Reg: MMC 51920 / FOGSI* | • High-Risk Obstetrics & Antenatal Care<br>• Advanced Laparoscopic & Hysteroscopic Surgeries<br>• Govt. Approved MTP & Family Welfare |

---

## 🏗️ Technical Architecture & Design Decisions

This project follows **Modern Vanilla Web Engineering** principles—no heavy JavaScript frameworks, zero build bloat, and instant load performance:

```
Smart-Clinic-Management-OPD-Portal/
├── index.html              # Semantic HTML5 architecture & accessible ARIA markup
├── styles.css              # Custom Vanilla CSS3 design system, tokens & glassmorphism
├── app.js                  # Pure ES6+ business logic, appointment wizard & UPI receipt generator
├── assets/
│   └── images/
│       ├── sjh-original-logo.jpg   # Authentic calligraphic logo of Shree J Hospital
│       ├── hero-clinic.jpg         # High-resolution clinic reception interior
│       ├── dr-rajeev-joshi.jpg     # Specialist portrait: Dr. Rajeev Joshi
│       └── dr-manasi-joshi.jpg     # Specialist portrait: Dr. Manasi Joshi
├── .gitignore              # Standard git exclusion rules
└── README.md               # Repository documentation & client portfolio guide
```

### Why Vanilla HTML, CSS & JavaScript?
1. **Blazing Fast Performance:** 0 dependencies, sub-500ms First Contentful Paint (FCP) on mobile 4G networks.
2. **Longevity & Zero Maintenance:** No broken `node_modules`, framework deprecations, or security vulnerabilities over time.
3. **Full Customization:** Tailored HSL color system (`#0284c7`, `#10b981`, `#0f172a`), fluid typography with Google Fonts (*Plus Jakarta Sans* & *Cinzel Decorative*), and responsive CSS grid.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/gittkhushal/Smart-Clinic-Management-OPD-Portal.git
cd Smart-Clinic-Management-OPD-Portal
```

### 2. Run Locally
Because this project uses standard web technologies, you can open it directly in any browser:

- **Option A (Instant):** Double-click [`index.html`](index.html) to view directly in your web browser.
- **Option B (VS Code):** Right-click [`index.html`](index.html) → **Open with Live Server**.
- **Option C (Python HTTP Server):**
  ```bash
  python -m http.server 5000
  ```
  Then open `http://localhost:5000` in your browser.
- **Option D (Node.js Serve):**
  ```bash
  npx -y serve -p 5000
  ```

---

## 📱 Mobile & Tablet Responsiveness

The interface adapts smoothly to all viewport sizes:
- **Desktop (1200px+):** Full multi-column dashboard, sticky navigation, and side-by-side specialist cards.
- **Tablets (768px – 1024px):** Reflowed grid with consolidated clinical stats and responsive modal wizards.
- **Smartphones (< 768px):** Hamburger menu, touch-optimized button hit areas (min 48px), and bottom-sheet token pass.

---

## 📄 License & Attribution

- **Project & Code:** MIT License — Developed by [Khushal Nagpure](https://github.com/gittkhushal),Nayan Nagendra,Om Agarwal.
- **Client Branding:** Courtesy of **Shree J Hospital (श्रीजे हॉस्पिटल)**, Bibwewadi, Pune.
