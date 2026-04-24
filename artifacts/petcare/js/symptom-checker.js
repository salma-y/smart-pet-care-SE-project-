(function () {
  let step = 1;
  const state = {
    species: "dog",
    area: "digestive",
    severity: 2,
    duration: "days",
    signs: new Set(),
    analyzing: false,
  };
  let result = null;

  const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Reptile", "Other"];
  const areaOptions = ["Skin/Coat", "Eyes/Ears", "Digestive", "Behavior", "Breathing", "Mobility", "Urinary", "Other"];
  const signOptions = ["Lethargy", "Loss of appetite", "Vomiting", "Diarrhea", "Pain when touched", "Fever"];

  const stepContent = document.getElementById("step-content");
  const progressBar = document.getElementById("progress-bar");

  function setProgress() {
    if (step >= 4) progressBar.parentElement.style.display = "none";
    else { progressBar.parentElement.style.display = "block"; progressBar.style.width = (step / 3) * 100 + "%"; }
  }

  function render() {
    setProgress();
    if (step === 1) {
      stepContent.innerHTML = `
        <div class="space-y-6 fade-in">
          <h2 class="text-xl font-semibold mb-4">What species is your pet?</h2>
          <div class="grid sm:grid-cols-3 gap-4" id="species-grid">
            ${speciesOptions.map(s => `
              <button type="button" class="radio-card ${state.species === s.toLowerCase() ? "selected" : ""}" data-species="${s.toLowerCase()}">
                <span class="font-semibold">${s}</span>
              </button>
            `).join("")}
          </div>
          <div class="pt-4 flex justify-end">
            <button class="btn btn-primary px-8" id="next-1">Next <i data-lucide="arrow-right" class="i-4"></i></button>
          </div>
        </div>
      `;
      stepContent.querySelectorAll("[data-species]").forEach(b => {
        b.addEventListener("click", () => { state.species = b.dataset.species; render(); });
      });
      stepContent.querySelector("#next-1").addEventListener("click", () => { step = 2; render(); });
    } else if (step === 2) {
      stepContent.innerHTML = `
        <div class="space-y-6 fade-in">
          <h2 class="text-xl font-semibold mb-4">What is the primary symptom area?</h2>
          <div class="grid sm:grid-cols-2 gap-3">
            ${areaOptions.map(s => `
              <button type="button" class="radio-row ${state.area === s.toLowerCase() ? "selected" : ""}" data-area="${s.toLowerCase()}" style="align-items: center;">
                <span class="font-medium">${s}</span>
              </button>
            `).join("")}
          </div>
          <div class="pt-4 flex justify-between">
            <button class="btn btn-ghost" id="back-2">Back</button>
            <button class="btn btn-primary px-8" id="next-2">Next <i data-lucide="arrow-right" class="i-4"></i></button>
          </div>
        </div>
      `;
      stepContent.querySelectorAll("[data-area]").forEach(b => {
        b.addEventListener("click", () => { state.area = b.dataset.area; render(); });
      });
      stepContent.querySelector("#back-2").addEventListener("click", () => { step = 1; render(); });
      stepContent.querySelector("#next-2").addEventListener("click", () => { step = 3; render(); });
    } else if (step === 3) {
      stepContent.innerHTML = `
        <div class="space-y-8 fade-in">
          <div>
            <h2 class="text-xl font-semibold mb-6">Severity & Duration</h2>
            <div class="space-y-4 mb-8">
              <label class="label text-base">How severe is the symptom?</label>
              <input type="range" min="1" max="5" step="1" value="${state.severity}" class="slider" id="severity" />
              <div class="flex justify-between text-xs text-muted-foreground">
                <span>Mild (1)</span><span>Moderate (3)</span><span>Severe (5)</span>
              </div>
            </div>
            <div class="space-y-4">
              <label class="label text-base">How long has this been happening?</label>
              <div class="flex flex-wrap gap-4" id="duration-group">
                ${[
                  { v: "hours", l: "Just started (hours)" },
                  { v: "days", l: "A few days" },
                  { v: "weeks", l: "Weeks or longer" }
                ].map(d => `
                  <button type="button" class="badge ${state.duration === d.v ? "badge-primary" : "badge-outline"}" data-duration="${d.v}" style="padding: 0.5rem 1rem; font-size: 0.875rem; cursor: pointer;">${d.l}</button>
                `).join("")}
              </div>
            </div>
          </div>
          <div>
            <label class="label text-base">Accompanying signs (check all that apply)</label>
            <div class="grid sm:grid-cols-2 gap-3" id="signs-grid">
              ${signOptions.map(s => `
                <label class="checkbox-row" data-sign="${s}">
                  <input type="checkbox" ${state.signs.has(s) ? "checked" : ""} />
                  <span class="flex-1">${s}</span>
                </label>
              `).join("")}
            </div>
          </div>
          <div class="pt-4 flex justify-between">
            <button class="btn btn-ghost" id="back-3">Back</button>
            <button class="btn btn-primary px-8" id="analyze-btn" style="min-width: 140px;">Analyze Symptoms</button>
          </div>
        </div>
      `;
      stepContent.querySelector("#severity").addEventListener("input", (e) => state.severity = Number(e.target.value));
      stepContent.querySelectorAll("[data-duration]").forEach(b => {
        b.addEventListener("click", () => { state.duration = b.dataset.duration; render(); });
      });
      stepContent.querySelectorAll("[data-sign]").forEach(b => {
        b.addEventListener("click", (e) => {
          if (e.target.tagName !== "INPUT") return;
          const s = b.dataset.sign;
          if (e.target.checked) state.signs.add(s); else state.signs.delete(s);
        });
      });
      stepContent.querySelector("#back-3").addEventListener("click", () => { step = 2; render(); });
      stepContent.querySelector("#analyze-btn").addEventListener("click", analyze);
    } else if (step === 4 && result) {
      const colors = {
        Emergency: { bg: "bg-red-100", text: "text-red-600" },
        Urgent: { bg: "bg-orange-100", text: "text-orange-600" },
        Soon: { bg: "bg-yellow-100", text: "text-yellow-600" },
        Routine: { bg: "bg-green-100", text: "text-green-600" },
      }[result.urgency];
      const icon = result.urgency === "Emergency" ? "shield-alert" : "heart-pulse";
      stepContent.innerHTML = `
        <div class="space-y-8 fade-in">
          <div class="text-center">
            <div class="quick-action-icon mx-auto mb-6 ${colors.bg} ${colors.text}" style="width:5rem; height:5rem;">
              <i data-lucide="${icon}" class="i-10"></i>
            </div>
            <h2 class="text-2xl font-bold mb-2">Evaluation: See Vet ${result.urgency}</h2>
            <p class="text-muted-foreground">${result.title}</p>
          </div>
          <div class="p-6 rounded-2xl border" style="background: hsl(40 40% 92% / 0.3);">
            <h3 class="font-semibold mb-4">Recommended Next Steps</h3>
            <ul class="space-y-3">
              ${result.steps.map((s, i) => `
                <li class="flex items-start gap-3">
                  <div style="width:1.5rem; height:1.5rem; border-radius: 50%; background: hsl(160 47% 45% / 0.2); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.75rem; font-weight: 700; margin-top: 0.125rem;">${i + 1}</div>
                  <span class="leading-relaxed">${s}</span>
                </li>
              `).join("")}
            </ul>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button class="btn btn-outline btn-h12 flex-1 text-base" id="restart-btn">Start Over</button>
            <a class="btn btn-primary btn-h12 flex-1 text-base" href="appointments-new.html?specialty=${encodeURIComponent(result.specialist)}">Book Appointment Now</a>
          </div>
          <p class="text-xs text-center text-muted-foreground mt-4">
            Disclaimer: This tool provides general guidance based on common veterinary practices. It does not replace professional medical advice. If you feel your pet is having a true emergency, go to the nearest emergency clinic immediately.
          </p>
        </div>
      `;
      stepContent.querySelector("#restart-btn").addEventListener("click", () => { step = 1; result = null; render(); });
    }
    window.renderIcons();
  }

  function analyze() {
    state.analyzing = true;
    const btn = document.getElementById("analyze-btn");
    btn.textContent = "Analyzing...";
    btn.disabled = true;
    setTimeout(() => {
      result = {
        urgency: "Soon",
        specialist: "General Vet",
        title: "Requires evaluation within 24-48 hours",
        steps: [
          "Keep your pet comfortable and monitor food/water intake.",
          "Avoid rigorous exercise until evaluated.",
          "Take a video of the symptom if it's intermittent to show the vet."
        ]
      };
      step = 4;
      render();
    }, 1500);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
