(function () {
  const D = window.PetData;
  const params = new URLSearchParams(window.location.search);
  const petId = params.get("id") || "1";
  const pet = D.getPet(petId);
  const root = document.getElementById("pet-detail-root");

  if (!pet) {
    root.innerHTML = `
      <div class="text-center py-16">
        <h1 class="text-2xl mb-4">Pet not found</h1>
        <a href="pets.html" class="btn btn-primary">Back to My Pets</a>
      </div>`;
    window.renderIcons();
    return;
  }

  const vaccinations = D.getVaccinations(petId);
  const labResults = D.getLabResults(petId);
  const prescriptions = D.getPrescriptions(petId);
  const medicalNotes = D.getMedicalNotes(petId);
  const weights = D.getWeightHistory(petId);
  const conditions = D.getChronicConditions(petId);

  function statusBadgeClass(status) {
    if (status === "Up to date" || status === "Negative" || status === "Normal") return "badge-green";
    if (status === "Due soon" || status === "Review") return "badge-yellow";
    if (status === "Overdue") return "badge-red";
    return "badge-secondary";
  }

  function fmtDate(iso) {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  // SVG line chart for weights
  function weightChart(data) {
    if (data.length === 0) return "<p class='text-muted-foreground text-center py-8'>No weight data yet.</p>";
    const W = 600, H = 240, pad = { l: 40, r: 20, t: 20, b: 30 };
    const innerW = W - pad.l - pad.r;
    const innerH = H - pad.t - pad.b;
    const minW = Math.min(...data.map(d => d.weight)) - 0.5;
    const maxW = Math.max(...data.map(d => d.weight)) + 0.5;
    const x = (i) => pad.l + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
    const y = (w) => pad.t + innerH - ((w - minW) / (maxW - minW)) * innerH;

    let path = "";
    let area = `M ${x(0)} ${y(data[0].weight)}`;
    data.forEach((d, i) => {
      if (i === 0) path += `M ${x(i)} ${y(d.weight)}`;
      else path += ` L ${x(i)} ${y(d.weight)}`;
      if (i > 0) area += ` L ${x(i)} ${y(d.weight)}`;
    });
    area += ` L ${x(data.length - 1)} ${pad.t + innerH} L ${x(0)} ${pad.t + innerH} Z`;

    // y-axis ticks (4)
    const ticks = [];
    for (let i = 0; i <= 4; i++) {
      const wv = minW + ((maxW - minW) * i / 4);
      ticks.push({ y: y(wv), label: wv.toFixed(1) });
    }

    // Ideal weight band (around current weight ± 5%)
    const ideal = pet.weight;
    const idealLow = ideal * 0.95;
    const idealHigh = ideal * 1.05;
    const idealRect = `<rect x="${pad.l}" y="${y(idealHigh)}" width="${innerW}" height="${y(idealLow) - y(idealHigh)}" class="chart-ideal" />`;

    return `
      <svg viewBox="0 0 ${W} ${H}" class="chart-svg" preserveAspectRatio="xMidYMid meet">
        ${idealRect}
        ${ticks.map(t => `
          <line x1="${pad.l}" y1="${t.y}" x2="${W - pad.r}" y2="${t.y}" class="chart-grid" />
          <text x="${pad.l - 8}" y="${t.y + 4}" text-anchor="end" class="chart-axis">${t.label}</text>
        `).join("")}
        ${data.map((d, i) => `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" class="chart-axis">${d.date}</text>`).join("")}
        <path d="${area}" class="chart-area" />
        <path d="${path}" class="chart-line" />
        ${data.map((d, i) => `<circle cx="${x(i)}" cy="${y(d.weight)}" r="4" class="chart-dot" />`).join("")}
      </svg>
    `;
  }

  function render() {
    root.innerHTML = `
      <!-- Back -->
      <a href="pets.html" class="btn btn-ghost btn-sm" style="padding-left: 0;">
        <i data-lucide="arrow-left" class="i-4"></i> Back to My Pets
      </a>

      <!-- Hero -->
      <div class="card overflow-hidden" style="position: relative;">
        <div style="height: 12rem; background: linear-gradient(135deg, hsl(160 47% 45% / 0.3), hsl(160 47% 45% / 0.05)); position: relative;">
          <div style="position:absolute; inset:0; opacity: 0.15; background-image: radial-gradient(circle at 2px 2px, hsl(160 47% 30%) 1px, transparent 0); background-size: 30px 30px;"></div>
        </div>
        <div class="p-6" style="position: relative; margin-top: -5rem;">
          <div class="flex flex-col md:flex-row items-start gap-6">
            <div class="avatar shadow-lg" style="width: 8rem; height: 8rem; border: 4px solid var(--card);">
              <img src="${pet.photoUrl}" alt="${pet.name}" />
            </div>
            <div class="flex-1" style="margin-top: 2rem;">
              <div class="flex items-center justify-between flex-wrap gap-3">
                <h1 class="text-4xl font-bold tracking-tight">${pet.name}</h1>
                <button class="btn btn-outline btn-sm">
                  <i data-lucide="pencil" class="i-4"></i> Edit Profile
                </button>
              </div>
              <p class="text-lg text-muted-foreground mt-1">${pet.breed} • ${pet.species}</p>
              <div class="flex flex-wrap gap-3 mt-4">
                <span class="badge badge-secondary"><i data-lucide="calendar" class="i-3"></i> ${pet.age}</span>
                <span class="badge badge-secondary"><i data-lucide="activity" class="i-3"></i> ${pet.weight} kg</span>
                ${pet.microchipId ? `<span class="badge badge-secondary"><i data-lucide="hash" class="i-3"></i> ${pet.microchipId}</span>` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div>
        <div class="tabs-list" style="grid-template-columns: repeat(2, 1fr); max-width: 700px;">
          <button class="tab active" data-tab="overview">Overview</button>
          <button class="tab" data-tab="medical">Medical Records</button>
        </div>

        <!-- Overview -->
        <div class="tab-content active" data-tab-content="overview">
          <div class="grid grid-2" style="gap: 1.5rem;">
            <div class="card card-soft">
              <div class="card-header pb-2">
                <h3 class="card-title flex items-center gap-2"><i data-lucide="info" class="i-5 text-primary"></i> About ${pet.name}</h3>
              </div>
              <div class="card-content space-y-4">
                <div>
                  <p class="text-xs text-muted-foreground uppercase tracking-wider mb-1">Owner Notes</p>
                  <p class="leading-relaxed">${pet.ownerNotes || "—"}</p>
                </div>
                ${pet.allergies && pet.allergies.length > 0 ? `
                  <div>
                    <p class="text-xs text-muted-foreground uppercase tracking-wider mb-2">Known Allergies</p>
                    <div class="flex flex-wrap gap-2">
                      ${pet.allergies.map(a => `<span class="badge badge-orange">${a}</span>`).join("")}
                    </div>
                  </div>
                ` : ""}
              </div>
            </div>

            <div class="card card-soft">
              <div class="card-header pb-2">
                <h3 class="card-title flex items-center gap-2"><i data-lucide="trending-up" class="i-5 text-primary"></i> Weight Trend</h3>
                <p class="card-description">Last 12 months • Current: ${pet.weight} kg</p>
              </div>
              <div class="card-content">
                <div style="height: 14rem;">${weightChart(weights)}</div>
                <p class="text-xs text-muted-foreground mt-2 text-center">Shaded band shows ideal weight range (±5%)</p>
              </div>
            </div>
          </div>

          <div class="card card-soft mt-6">
            <div class="card-header pb-2">
              <h3 class="card-title flex items-center gap-2"><i data-lucide="clipboard-list" class="i-5 text-primary"></i> Recent Symptom Log</h3>
              <p class="card-description">Track flare-ups and behavioral changes over time</p>
            </div>
            <div class="card-content">
              ${conditions.length === 0 ? `<p class="text-muted-foreground text-center py-6">No recent entries.</p>` : `
                <div style="margin-top: 1rem;">
                  ${conditions.map(c => `
                    <div class="timeline-item">
                      <div class="timeline-dot"></div>
                      <div class="flex justify-between items-start mb-1">
                        <h4 class="font-semibold">${c.condition}</h4>
                        <span class="text-xs text-muted-foreground">${fmtDate(c.date)}</span>
                      </div>
                      <p class="text-sm text-muted-foreground mb-2">${c.notes}</p>
                      <div class="flex items-center gap-2">
                        <span class="text-xs uppercase text-muted-foreground tracking-wider">Severity</span>
                        <div class="flex gap-1">
                          ${[1,2,3,4,5].map(n => `<div style="width:1rem; height:0.375rem; border-radius:2px; background: ${n <= c.severity ? "var(--primary)" : "var(--secondary)"};"></div>`).join("")}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Medical -->
        <div class="tab-content" data-tab-content="medical">
          <div class="space-y-6">
            <!-- Vaccinations -->
            <div class="card card-soft">
              <div class="card-header pb-2 flex items-center justify-between">
                <div>
                  <h3 class="card-title flex items-center gap-2"><i data-lucide="syringe" class="i-5 text-primary"></i> Vaccinations</h3>
                  <p class="card-description">Tracking ${vaccinations.length} vaccinations</p>
                </div>
                <button class="btn btn-outline btn-sm"><i data-lucide="plus" class="i-4"></i> Add</button>
              </div>
              <div class="card-content">
                ${vaccinations.length === 0 ? `<p class="text-muted-foreground text-center py-4">No records yet.</p>` : `
                  <div class="space-y-3">
                    ${vaccinations.map(v => `
                      <div class="flex items-center justify-between p-4" style="border:1px solid var(--border); border-radius: var(--radius-xl); background: hsl(40 40% 92% / 0.2);">
                        <div>
                          <h4 class="font-semibold">${v.name}</h4>
                          <p class="text-sm text-muted-foreground">Given ${fmtDate(v.dateAdministered)} • Next due ${fmtDate(v.nextDue)}</p>
                        </div>
                        <span class="badge ${statusBadgeClass(v.status)}">${v.status}</span>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>
            </div>

            <!-- Lab Results -->
            <div class="card card-soft">
              <div class="card-header pb-2">
                <h3 class="card-title flex items-center gap-2"><i data-lucide="flask-conical" class="i-5 text-primary"></i> Lab Results</h3>
                <p class="card-description">Click to expand AI-summarized explanations</p>
              </div>
              <div class="card-content">
                ${labResults.length === 0 ? `<p class="text-muted-foreground text-center py-4">No lab results yet.</p>` : `
                  <div class="space-y-3">
                    ${labResults.map(l => `
                      <div class="lab-item" data-lab-id="${l.id}">
                        <div class="lab-header" data-lab-toggle="${l.id}">
                          <div>
                            <h4 class="font-semibold">${l.testName}</h4>
                            <p class="text-sm text-muted-foreground">${fmtDate(l.date)}</p>
                          </div>
                          <div class="flex items-center gap-3">
                            <span class="badge ${statusBadgeClass(l.status)}">${l.status}</span>
                            <i data-lucide="chevron-down" class="i-5 text-muted-foreground"></i>
                          </div>
                        </div>
                        <div class="lab-body">
                          <div class="flex items-start gap-3">
                            <div class="quick-action-icon" style="width:2rem; height:2rem; background:#dbeafe; flex-shrink: 0;">
                              <i data-lucide="sparkles" class="i-4 text-blue-600"></i>
                            </div>
                            <div>
                              <p class="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">Plain-English Summary</p>
                              <p class="text-sm leading-relaxed text-blue-900">${l.summary}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>
            </div>

            <!-- Prescriptions -->
            <div class="card card-soft">
              <div class="card-header pb-2 flex items-center justify-between">
                <div>
                  <h3 class="card-title flex items-center gap-2"><i data-lucide="pill" class="i-5 text-primary"></i> Prescriptions</h3>
                </div>
                <button class="btn btn-outline btn-sm"><i data-lucide="plus" class="i-4"></i> Request Refill</button>
              </div>
              <div class="card-content">
                ${prescriptions.length === 0 ? `<p class="text-muted-foreground text-center py-4">No active prescriptions.</p>` : `
                  <div class="space-y-3">
                    ${prescriptions.map(p => `
                      <div class="p-4" style="border:1px solid var(--border); border-radius: var(--radius-xl);">
                        <div class="flex justify-between items-start mb-2">
                          <h4 class="font-semibold">${p.medication}</h4>
                          <span class="badge ${p.refills > 0 ? "badge-green" : "badge-red"}">${p.refills} refills</span>
                        </div>
                        <div class="grid sm:grid-cols-2 gap-2 text-sm">
                          <p class="text-muted-foreground"><strong class="text-foreground font-medium">Dosage:</strong> ${p.dosage}</p>
                          <p class="text-muted-foreground"><strong class="text-foreground font-medium">Schedule:</strong> ${p.schedule}</p>
                        </div>
                        <p class="text-xs text-muted-foreground mt-2">Prescribed by ${p.vet}</p>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>
            </div>

            <!-- Medical Notes -->
            <div class="card card-soft">
              <div class="card-header pb-2">
                <h3 class="card-title flex items-center gap-2"><i data-lucide="notebook-pen" class="i-5 text-primary"></i> Visit Notes</h3>
              </div>
              <div class="card-content">
                ${medicalNotes.length === 0 ? `<p class="text-muted-foreground text-center py-4">No visit notes yet.</p>` : `
                  <div class="space-y-4">
                    ${medicalNotes.map(n => `
                      <div class="p-4" style="border-left: 3px solid var(--primary); background: hsl(160 47% 45% / 0.05); border-radius: 0 var(--radius-xl) var(--radius-xl) 0;">
                        <div class="flex justify-between items-start mb-2">
                          <p class="font-semibold text-sm">${n.vet}</p>
                          <span class="text-xs text-muted-foreground">${fmtDate(n.date)}</span>
                        </div>
                        <p class="text-sm leading-relaxed">${n.note}</p>
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Tab logic
    root.querySelectorAll(".tab").forEach((t) => {
      t.addEventListener("click", () => {
        const target = t.dataset.tab;
        root.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x === t));
        root.querySelectorAll(".tab-content").forEach(x => x.classList.toggle("active", x.dataset.tabContent === target));
        window.renderIcons();
      });
    });

    // Lab accordion
    root.querySelectorAll("[data-lab-toggle]").forEach((h) => {
      h.addEventListener("click", () => {
        const id = h.dataset.labToggle;
        const item = root.querySelector(`[data-lab-id="${id}"]`);
        item.classList.toggle("open");
        const chev = h.querySelector('[data-lucide="chevron-down"]');
        if (chev) chev.style.transform = item.classList.contains("open") ? "rotate(180deg)" : "rotate(0deg)";
      });
    });

    window.renderIcons();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
