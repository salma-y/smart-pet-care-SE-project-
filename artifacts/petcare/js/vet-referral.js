(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const patients = window.VetData.getPatients();
    document.getElementById("ref-patient").innerHTML = patients.map((p) => `<option value="${p.id}">${p.name} (${p.species}) — ${p.ownerName}</option>`).join("");

    const formCard = document.getElementById("new-form-card");
    formCard.style.display = "none";
    document.getElementById("open-new").addEventListener("click", () => {
      formCard.style.display = "block";
      formCard.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.getElementById("cancel-form").addEventListener("click", () => formCard.style.display = "none");

    function statusBadge(s) {
      const map = { Sent: "primary", "In Progress": "amber", Received: "outline", Completed: "green" };
      return `<span class="badge badge-${map[s] || "outline"}">${s}</span>`;
    }

    function statusSteps(current) {
      const steps = ["Sent", "Received", "In Progress", "Completed"];
      const idx = steps.indexOf(current);
      return `
        <div class="flex items-center gap-1" style="font-size:0.75rem;">
          ${steps.map((s, i) => `
            <div class="flex items-center gap-1">
              <span style="width:0.65rem;height:0.65rem;border-radius:50%;background:${i <= idx ? 'var(--primary)' : 'var(--secondary)'};"></span>
              <span style="color:${i <= idx ? 'var(--foreground)' : 'var(--muted-foreground)'};">${s}</span>
              ${i < steps.length - 1 ? `<span style="width:1.25rem;height:1px;background:${i < idx ? 'var(--primary)' : 'var(--secondary)'};margin:0 0.25rem;"></span>` : ''}
            </div>
          `).join("")}
        </div>
      `;
    }

    function renderList() {
      const list = window.VetData.getReferrals();
      document.getElementById("ref-list").innerHTML = list.map((r) => `
        <div class="card p-4" style="margin-bottom:0.75rem;">
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div class="flex items-center gap-2">
                <strong>${r.patient}</strong>
                <span class="badge badge-secondary">${r.specialist}</span>
                ${statusBadge(r.status)}
              </div>
              <p class="text-sm text-muted-foreground" style="margin-top:0.25rem;">To: <strong style="color:var(--foreground);">${r.recipientClinic}</strong></p>
              <p class="text-sm" style="margin-top:0.25rem;">${r.reason}</p>
              <p class="text-xs text-muted-foreground" style="margin-top:0.5rem;">Attached: ${r.attached.join(", ")}</p>
            </div>
            <span class="text-xs text-muted-foreground">${r.date}</span>
          </div>
          <div style="margin-top:0.75rem;">${statusSteps(r.status)}</div>
        </div>
      `).join("");
      if (window.renderIcons) window.renderIcons();
    }

    document.getElementById("send-ref").addEventListener("click", () => {
      const patientId = document.getElementById("ref-patient").value;
      const patient = patients.find((p) => p.id === patientId);
      const clinic = document.getElementById("ref-clinic").value.trim();
      const reason = document.getElementById("ref-reason").value.trim();
      if (!clinic || !reason) { window.showToast("Missing fields", "Add clinic and reason."); return; }
      const attached = Array.from(document.querySelectorAll("#attach-grid input:checked")).map((i) => i.value);
      window.VetData.addReferral({
        id: "r" + Date.now(),
        patient: patient.name,
        recipientClinic: clinic,
        specialist: document.getElementById("ref-type").value,
        reason: reason,
        attached: attached,
        status: "Sent",
        date: new Date().toISOString().split("T")[0],
      });
      window.showToast("Referral sent", `Forwarded to ${clinic}`);
      formCard.style.display = "none";
      document.getElementById("ref-clinic").value = "";
      document.getElementById("ref-reason").value = "";
      renderList();
    });

    renderList();
  });
})();
