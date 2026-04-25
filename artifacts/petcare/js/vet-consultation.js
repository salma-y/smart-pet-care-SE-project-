(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(location.search);
    const patientId = params.get("id") || "p1";
    const patient = window.VetData.getPatient(patientId) || window.VetData.getPatients()[0];

    document.getElementById("pet-sidebar").innerHTML = `
      <div class="text-center">
        <div class="patient-card-img" style="height:9rem;border-radius:0.75rem;overflow:hidden;margin-bottom:0.75rem;">
          <img src="${patient.photoUrl}" alt="${patient.name}" />
        </div>
        <h3 class="text-xl font-bold">${patient.name}</h3>
        <p class="text-sm text-muted-foreground">${patient.breed} · ${patient.species}</p>
      </div>
      <div class="border-t" style="padding-top:0.75rem;">
        <p class="text-xs text-muted-foreground mb-1">OWNER</p>
        <p class="text-sm font-medium">${patient.ownerName}</p>
      </div>
      <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 0.5rem;">
        <div class="card p-2 text-center">
          <p class="text-xs text-muted-foreground">Age</p>
          <p class="font-semibold text-sm">${patient.age}</p>
        </div>
        <div class="card p-2 text-center">
          <p class="text-xs text-muted-foreground">Weight</p>
          <p class="font-semibold text-sm">${patient.weight} kg</p>
        </div>
      </div>
      <div>
        <p class="text-xs text-muted-foreground mb-2">CONDITIONS</p>
        <div class="flex flex-wrap gap-1">
          ${patient.conditions.length ? patient.conditions.map((c) => `<span class="badge badge-amber">${c}</span>`).join("") : '<span class="text-xs text-muted-foreground">None reported</span>'}
        </div>
      </div>
      <div>
        <p class="text-xs text-muted-foreground mb-2">FLAGS</p>
        <div class="flex flex-wrap gap-1">
          ${patient.flags.length ? patient.flags.map((f) => `<span class="badge badge-red">${f}</span>`).join("") : '<span class="text-xs text-muted-foreground">No active flags</span>'}
        </div>
      </div>
      <div class="space-y-1" style="margin-top:0.5rem;">
        <a href="pet-detail.html?id=${patient.id}" class="btn btn-outline btn-sm w-full"><i data-lucide="file-text" class="i-4"></i> Full Record</a>
        <a href="vet-prescription.html?patient=${patient.id}" class="btn btn-outline btn-sm w-full"><i data-lucide="pill" class="i-4"></i> Issue Rx</a>
      </div>
    `;

    const audit = [
      { time: "10:14 AM", vet: "Dr. Sarah Jenkins", type: "SOAP — Subjective", text: "Owner reports increased ear scratching over past 4 days. Diet unchanged." },
      { time: "10:17 AM", vet: "Dr. Sarah Jenkins", type: "SOAP — Objective", text: "T 38.6°C, HR 90 bpm, R 22. Mild erythema on left pinna. No discharge." },
      { time: "10:21 AM", vet: "Dr. Michael Chen", type: "Note (consulting)", text: "Concur with allergic etiology. Suggest cytology to rule out yeast." },
    ];

    function renderAudit() {
      const el = document.getElementById("audit-trail");
      const count = document.getElementById("audit-count");
      count.textContent = `${audit.length} entr${audit.length === 1 ? "y" : "ies"}`;
      if (audit.length === 0) {
        el.innerHTML = `<div class="empty-state"><div class="empty-state-icon"><i data-lucide="file-plus" class="i-6"></i></div><p>No findings yet — add the first observation above.</p></div>`;
      } else {
        el.innerHTML = audit.map((a) => `
          <div class="audit-item">
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <strong style="font-size:0.875rem;">${a.vet}</strong>
              <span class="badge badge-outline">${a.type}</span>
              <span class="text-xs text-muted-foreground">${a.time}</span>
            </div>
            <p class="text-sm">${a.text}</p>
          </div>
        `).join("");
      }
      if (window.renderIcons) window.renderIcons();
    }

    document.getElementById("add-finding").addEventListener("click", () => {
      const text = document.getElementById("finding-text").value.trim();
      const type = document.getElementById("finding-type").value;
      if (!text) {
        window.showToast("Empty note", "Please enter your finding before adding.");
        return;
      }
      audit.push({
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        vet: "Dr. Sarah Jenkins",
        type: type,
        text: text,
      });
      document.getElementById("finding-text").value = "";
      renderAudit();
      window.showToast("Added to record", "Audit trail updated.");
    });

    document.getElementById("attach-lab").addEventListener("click", () => {
      window.location.href = "vet-lab-upload.html?patient=" + patient.id;
    });
    document.getElementById("save-note").addEventListener("click", () => window.showToast("Saved", "Consultation note saved to patient record."));
    document.getElementById("end-session").addEventListener("click", () => { if (confirm("End this consultation session?")) window.location.href = "vet-dashboard.html"; });

    renderAudit();
  });
})();
