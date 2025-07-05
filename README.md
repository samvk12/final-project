# 🧘 Ayurveda Diagnosis Tool

An intelligent web-based tool to assess imbalances and provide Ayurvedic wellness suggestions through rule-based logic and AI.

---

## 🗓️ Development Timeline

### ✅ Day 1 – Project Planning and Setup

- Defined project idea: a tool to diagnose health imbalances using Ayurvedic principles.
- Chose tech stack: HTML, CSS, JavaScript (frontend) + Node.js (backend).
- Created folder structure:

  ```
  /project
    ├── index.html
    ├── styles.css
    ├── script.js
    └── server.js
  ```

### ✅ Day 2 – Frontend Development

- Designed homepage layout with semantic HTML and minimalist CSS.
- Added **Ayurveda logo** (lotus + swastik).
- Built **Prakriti Quiz Form** and **Diagnosis Form**.

### ✅ Day 3 – Frontend Styling & Interactivity

- Styled forms using traditional themes and Google Fonts.
- Added JavaScript for:
  - Prakriti calculation
  - Autofill diagnosis form
  - Multi-select symptoms handling

### ✅ Day 4 – Backend Setup

- Set up Express backend server.
- Added `/diagnose` route and built `diagnosis.js` with Ayurvedic rules.
- Connected frontend to backend via fetch API.

### ✅ Day 5 – AI Integration (OpenAI)

- Added `openai` package and `/ai-diagnose` route.
- Sent user info to GPT-3.5 to generate Ayurvedic suggestions.
- Displayed AI results on the frontend.

### ✅ Day 6 – LocalStorage & Report History

- Saved diagnosis reports with timestamp and data.
- Created report history viewer using DOM and JSON.

### ✅ Day 7 – Testing & Final Touches

- Debugged auto-fill and DOM rendering.
- Switched to GPT-3.5-turbo when GPT-4 access failed.
- Improved layout, responsiveness, and browser compatibility.

---

## ✅ Features

- 🧠 Constitution (Prakriti) quiz
- 🌿 Disease diagnosis form
- 🤖 AI-powered Ayurvedic advice
- 🗂️ Local report saving + viewing

---

## 🚀 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **AI:** OpenAI (GPT-3.5)
- **Storage:** Browser `localStorage`

---

## 🧪 Run Locally

```bash
git clone https://github.com/your-username/ayurveda-tool.git
cd ayurveda-tool
npm install
node server.js
# Open index.html in browser
```

---

## 🙏 Made with ❤️ for holistic wellness.
