(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const q = document.getElementById("q");
    const sp = document.getElementById("filter-species");
    const cond = document.getElementById("filter-condition");
    const reset = document.getElementById("reset-filters");
    const grid = document.getElementById("patient-grid");
    const counter = document.getElementById("result-count");

    function render() {
      const term = q.value.trim().toLowerCase();
      const speciesVal = sp.value;
      const condVal = cond.value.toLowerCase();

      const filtered = window.VetData.getPatients().filter((p) => {
        if (speciesVal && p.species !== speciesVal) return false;
        if (condVal && !p.conditions.some((c) => c.toLowerCase().includes(condVal))) return false;
        if (term && !(p.name.toLowerCase().includes(term) || p.ownerName.toLowerCase().includes(term) || p.breed.toLowerCase().includes(term))) return false;
        return true;
      });

      counter.textContent = `${filtered.length} patient${filtered.length !== 1 ? 's' : ''}`;

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-state-icon"><i data-lucide="search-x" class="i-6"></i></div>
            <h3 class="font-semibold mb-2">No patients match your filters</h3>
            <p class="text-sm">Try clearing some filters or adjusting your search term.</p>
          </div>
        `;
      } else {
        grid.innerHTML = filtered.map((p) => `
          <a href="pet-detail.html?id=${p.id}" class="patient-card">
            <div class="patient-card-img"><img src="${p.photoUrl}" alt="${p.name}" /></div>
            <div class="patient-card-body">
              <div class="flex items-center justify-between">
                <strong style="font-size:1rem;">${p.name}</strong>
                <span class="badge badge-secondary">${p.species}</span>
              </div>
              <p class="text-sm text-muted-foreground">${p.breed} · ${p.age}</p>
              <p class="text-xs text-muted-foreground">Owner: ${p.ownerName}</p>
              <p class="text-xs text-muted-foreground">Last visit: ${p.lastVisit}</p>
              <div class="flex flex-wrap gap-1" style="margin-top:0.25rem;">
                ${p.conditions.map((c) => `<span class="badge badge-amber">${c}</span>`).join("")}
                ${p.flags.map((f) => `<span class="badge badge-red">${f}</span>`).join("")}
                ${(p.conditions.length === 0 && p.flags.length === 0) ? '<span class="badge badge-green">Healthy</span>' : ''}
              </div>
            </div>
          </a>
        `).join("");
      }
      if (window.renderIcons) window.renderIcons();
    }

    [q, sp, cond].forEach((el) => el.addEventListener("input", render));
    reset.addEventListener("click", () => { q.value = ""; sp.value = ""; cond.value = ""; render(); });
    render();
  });
})();
