(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const all = window.VetData.getRecalls();
    const affected = window.VetData.getRelevantRecalls();

    document.getElementById("affected-count").textContent = `${affected.length} affect${affected.length === 1 ? 's' : ''} you`;

    function renderList(list, emptyMsg) {
      if (list.length === 0) {
        return `
          <div class="empty-state">
            <div class="empty-state-icon"><i data-lucide="check-circle-2" class="i-6"></i></div>
            <h3 class="font-semibold mb-2">All clear</h3>
            <p class="text-sm">${emptyMsg}</p>
          </div>
        `;
      }
      return list.map((r) => `
        <div class="recall-card severity-${r.severity}" style="margin-bottom:1rem;">
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <strong style="font-size:1rem;">${r.productName}</strong>
                <span class="badge ${r.severity === 'high' ? 'badge-red' : r.severity === 'medium' ? 'badge-amber' : 'badge-secondary'}">${r.severity.toUpperCase()}</span>
                ${r.affectsPurchase ? `<span class="badge badge-red"><i data-lucide="alert-circle" class="i-3"></i> You purchased this</span>` : ""}
              </div>
            </div>
            <span class="text-xs text-muted-foreground">${new Date(r.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
          <p class="text-sm" style="margin-top:0.5rem;"><strong>Reason:</strong> ${r.reason}</p>
          <p class="text-sm" style="margin-top:0.25rem;"><strong>Recommended action:</strong> ${r.action}</p>
          <div class="flex gap-2" style="margin-top:0.75rem;">
            <button class="btn btn-outline btn-sm" onclick="window.showToast('Acknowledged', 'Marked as read.')">Acknowledge</button>
            <button class="btn btn-ghost btn-sm">View advisory</button>
          </div>
        </div>
      `).join("");
    }

    document.getElementById("tab-affected").innerHTML = renderList(affected, "No recalls match products in your purchase history.");
    document.getElementById("tab-all").innerHTML = renderList(all, "No recent recalls.");

    document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      document.getElementById("tab-" + t.dataset.tab).classList.add("active");
      if (window.renderIcons) window.renderIcons();
    }));

    if (window.renderIcons) window.renderIcons();
  });
})();
