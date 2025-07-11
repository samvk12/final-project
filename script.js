document.addEventListener('DOMContentLoaded', function () {
  const quizForm = document.getElementById('prakritiQuiz');
  const diagnosisForm = document.getElementById('diagnosisForm');
  const diagnosisDropdown = document.getElementById('prakriti');
  const quizResult = document.getElementById('quizResult');
  const symptomsSelect = document.getElementById('symptoms');
  const lifestyleInput = document.getElementById('lifestyle');
  const resultBox = document.getElementById('diagnosisResult');
  const resultSection = document.getElementById('diagnosisResultSection');
  const reportBtn = document.getElementById('viewReportsBtn');
  const reportContainer = document.getElementById('reportHistory');

  const BACKEND_URL = 'https://ayurveda-backend-41zj.onrender.com';

  // ✅ Handle prakriti quiz
  if (quizForm && diagnosisDropdown && quizResult) {
    quizForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const scores = { vata: 0, pitta: 0, kapha: 0 };
      const selects = quizForm.querySelectorAll('select');

      selects.forEach(select => {
        const val = select.value;
        if (scores[val] !== undefined) {
          scores[val]++;
        }
      });

      const prakriti = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
      );

      quizResult.innerText = `Your dominant Prakriti is: ${prakriti.toUpperCase()}`;
      diagnosisDropdown.value = prakriti;
    });
  }

  // ✅ Handle diagnosis form
  if (diagnosisForm) {
    diagnosisForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const prakriti = diagnosisDropdown?.value || "";
      const lifestyle = lifestyleInput?.value || "";
      const symptoms = Array.from(symptomsSelect?.selectedOptions || []).map(
        option => option.value
      );

      // ✅ Corrected backend URL
      const response = await fetch('https://ayurveda-backend-41zj.onrender.com/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prakriti, symptoms, lifestyle })
      });

      const data = await response.json();

      if (data.imbalance) {
        resultBox.innerHTML = `
          <h3>${data.message}</h3>
          <p><strong>Your Prakriti:</strong> ${data.prakriti.toUpperCase()}</p>
          <p><strong>Foods to Favor:</strong> ${data.foods.join(', ')}</p>
          <p><strong>Recommended Yoga:</strong> ${data.yoga.join(', ')}</p>
          <p><strong>Lifestyle Tip:</strong> ${data.tip}</p>
        `;
      } else {
        resultBox.innerHTML = `<p>${data.message}</p>`;
      }

      resultSection.style.display = 'block';

      // ✅ Save report
      const report = {
        prakriti,
        symptoms,
        lifestyle,
        diagnosis: data.message,
        foods: data.foods,
        yoga: data.yoga,
        tip: data.tip,
        aiAdvice: "N/A", // Set manually since AI is off
        timestamp: new Date().toLocaleString()
      };

      let history = JSON.parse(localStorage.getItem('reports')) || [];
      history.push(report);
      localStorage.setItem('reports', JSON.stringify(history));
    });
  }

  // ✅ View past reports
  if (reportBtn && reportContainer) {
    reportBtn.addEventListener('click', function () {
      const reportHistory = JSON.parse(localStorage.getItem('reports')) || [];
      reportContainer.innerHTML = '<h3>Past Reports</h3>';

      if (reportHistory.length === 0) {
        reportContainer.innerHTML += '<p>No previous reports found.</p>';
        return;
      }

      reportHistory.reverse().forEach(r => {
        reportContainer.innerHTML += `
          <div class="past-report" style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem;">
            <strong>Date:</strong> ${r.timestamp}<br>
            <strong>Prakriti:</strong> ${r.prakriti}<br>
            <strong>Symptoms:</strong> ${r.symptoms.join(', ')}<br>
            <strong>Diagnosis:</strong> ${r.diagnosis}<br>
            <strong>Foods:</strong> ${r.foods.join(', ')}<br>
            <strong>Yoga:</strong> ${r.yoga.join(', ')}<br>
            <strong>Tip:</strong> ${r.tip}<br>
            <strong>AI Advice:</strong><br><em>${r.aiAdvice.replace(/\n/g, '<br>')}</em>
          </div>
        `;
      });
    });
  }
});

