(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const patients = window.VetData.getPatients();
    const select = document.getElementById("patient-select");
    select.innerHTML = patients.map((p) => `<option value="${p.id}">${p.name} — ${p.ownerName}</option>`).join("");
    const params = new URLSearchParams(location.search);
    if (params.get("patient")) select.value = params.get("patient");

    // Status chips
    document.getElementById("status-chips").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      document.querySelectorAll("#status-chips .chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
    });

    // File picker (UI only)
    const dz = document.getElementById("dropzone");
    const fname = document.getElementById("file-name");
    const fakeFile = () => {
      fname.textContent = `Selected: bloodwork-${Date.now().toString().slice(-6)}.pdf`;
    };
    document.getElementById("file-pick").addEventListener("click", fakeFile);
    dz.addEventListener("click", (e) => { if (e.target === dz) fakeFile(); });
    ["dragover", "dragenter"].forEach((evt) => dz.addEventListener(evt, (e) => { e.preventDefault(); dz.classList.add("drag-over"); }));
    ["dragleave", "drop"].forEach((evt) => dz.addEventListener(evt, (e) => { e.preventDefault(); dz.classList.remove("drag-over"); if (evt === "drop") fakeFile(); }));

    document.getElementById("publish").addEventListener("click", () => {
      const test = document.getElementById("test-name").value.trim();
      if (!test) { window.showToast("Missing test name", "Enter a test name to publish."); return; }
      window.showToast("Lab result published", "Owner will be notified with the simplified insight.");
      setTimeout(() => window.location.href = "vet-dashboard.html", 1200);
    });
    document.getElementById("save-draft").addEventListener("click", () => window.showToast("Draft saved"));
  });
})();
