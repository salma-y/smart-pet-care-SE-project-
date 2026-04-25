(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const patients = window.VetData.getPatients();
    const select = document.getElementById("patient-select");
    select.innerHTML = patients.map((p) => `<option value="${p.id}">${p.name} (${p.species}, ${p.breed}) — ${p.ownerName}</option>`).join("");

    const params = new URLSearchParams(location.search);
    if (params.get("patient")) select.value = params.get("patient");

    const drugInput = document.getElementById("drug-input");
    const drugList = document.getElementById("drug-list");
    const drugAc = document.getElementById("drug-ac");
    let selectedDrug = null;

    drugInput.addEventListener("input", () => {
      const term = drugInput.value.trim().toLowerCase();
      if (!term) { drugAc.classList.remove("open"); update(); return; }
      const matches = window.VetData.getDrugs().filter((d) => d.name.toLowerCase().includes(term)).slice(0, 8);
      if (matches.length === 0) {
        drugAc.classList.remove("open");
      } else {
        drugList.innerHTML = matches.map((d) => `<div class="autocomplete-item" data-name="${d.name}"><span>${d.name}</span><small>${d.category}</small></div>`).join("");
        drugAc.classList.add("open");
      }
    });

    drugList.addEventListener("click", (e) => {
      const item = e.target.closest(".autocomplete-item");
      if (!item) return;
      drugInput.value = item.dataset.name;
      selectedDrug = window.VetData.getDrug(item.dataset.name);
      drugAc.classList.remove("open");
      update();
    });

    document.addEventListener("click", (e) => {
      if (!drugAc.contains(e.target)) drugAc.classList.remove("open");
    });

    // Currently active patient meds (mocked from prescriptions data)
    function getActiveMeds(patientId) {
      const all = window.PetData.getPrescriptions(patientId === "p1" ? "1" : "");
      return all.map((p) => p.medication.split(" ")[0]); // e.g., "Apoquel" from "Apoquel"
    }

    function checkInteractions() {
      if (!selectedDrug) return [];
      const patientId = select.value;
      const active = getActiveMeds(patientId);
      const conflicts = [];
      selectedDrug.interactionsWith.forEach((interactWith) => {
        if (active.some((a) => a.toLowerCase() === interactWith.toLowerCase())) {
          conflicts.push(interactWith);
        }
      });
      // Demo: always flash warning if Carprofen + select demo patient
      if (selectedDrug.name === "Carprofen" && patientId === "p5") conflicts.push("Furosemide (active)");
      if (selectedDrug.name === "Prednisone" && (patientId === "p5" || patientId === "p1")) conflicts.push("Insulin (Vetsulin)");
      return conflicts;
    }

    function update() {
      const patient = patients.find((p) => p.id === select.value);
      const drugName = drugInput.value || "—";
      const dose = document.getElementById("dose").value;
      const freq = document.getElementById("freq").value;
      const dur = document.getElementById("duration").value;
      const refills = document.getElementById("refills").value;

      document.getElementById("rx-date").textContent = new Date().toLocaleDateString();
      document.getElementById("rx-preview").innerHTML = `
        <p><strong>Patient:</strong> ${patient ? patient.name : "—"} ${patient ? `<span class="text-muted-foreground">(${patient.species}, ${patient.weight} kg)</span>` : ""}</p>
        <p><strong>Owner:</strong> ${patient ? patient.ownerName : "—"}</p>
        <p><strong>Medication:</strong> ${drugName}</p>
        <p><strong>Sig:</strong> ${dose} ${freq.toLowerCase()} for ${dur}</p>
        <p><strong>Refills:</strong> ${refills}</p>
        <p><strong>Prescriber:</strong> Dr. Sarah Jenkins, DVM</p>
      `;

      const conflicts = checkInteractions();
      const slot = document.getElementById("warning-slot");
      if (conflicts.length === 0) {
        slot.innerHTML = "";
      } else {
        slot.innerHTML = `
          <div class="drug-warning">
            <i data-lucide="alert-triangle" class="i-6"></i>
            <div>
              <h4>Potential drug interaction detected</h4>
              <p>${selectedDrug.name} may interact with this patient's active medication: <strong>${conflicts.join(", ")}</strong>. Review carefully or choose an alternative.</p>
            </div>
          </div>
        `;
      }
      if (window.renderIcons) window.renderIcons();
    }

    ["change", "input"].forEach((evt) => {
      ["patient-select", "dose", "freq", "duration", "refills"].forEach((id) => {
        document.getElementById(id).addEventListener(evt, update);
      });
    });

    document.getElementById("issue-rx").addEventListener("click", () => {
      if (!drugInput.value) { window.showToast("Missing drug", "Select a medication first."); return; }
      window.showToast("Prescription issued", `Sent to owner & ${document.getElementById("link-marketplace").checked ? "Marketplace" : "pharmacy"}.`);
      setTimeout(() => window.location.href = "vet-dashboard.html", 1200);
    });
    document.getElementById("save-draft").addEventListener("click", () => window.showToast("Draft saved"));

    update();
  });
})();
