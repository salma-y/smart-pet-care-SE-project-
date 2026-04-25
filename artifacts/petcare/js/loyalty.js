(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const data = window.VetData.getLoyalty();
    const pct = Math.min(100, (data.balance / data.nextRewardAt) * 100);

    document.getElementById("loyalty-hero").innerHTML = `
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p style="font-size:0.875rem;opacity:0.85;">Current balance</p>
          <h2>${data.balance.toLocaleString()} <span style="font-size:1.25rem;opacity:0.85;font-weight:500;">points</span></h2>
        </div>
        <div class="quick-action-icon" style="width:4rem;height:4rem;background:rgba(255,255,255,0.2);"><i data-lucide="award" class="i-8" style="color:#fff;"></i></div>
      </div>
      <div>
        <div class="loyalty-progress"><div class="loyalty-progress-bar" style="width:${pct}%;"></div></div>
        <p class="text-sm" style="margin-top:0.5rem;opacity:0.9;">${(data.nextRewardAt - data.balance).toLocaleString()} points until your next reward (${data.nextRewardAt.toLocaleString()} pts)</p>
      </div>
    `;

    document.getElementById("hist-body").innerHTML = data.history.map((h) => `
      <tr>
        <td>${h.action}</td>
        <td class="text-muted-foreground">${new Date(h.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
        <td class="text-right" style="color:var(--primary);font-weight:600;">+${h.points}</td>
      </tr>
    `).join("");

    document.getElementById("redeem-grid").innerHTML = data.redeemable.map((r) => {
      const can = data.balance >= r.points;
      return `
        <div class="card p-4 ${can ? '' : 'opacity-50'}" style="${can ? '' : 'opacity:0.6;'}">
          <div class="quick-action-icon bg-primary-tint" style="width:2.5rem;height:2.5rem;margin-bottom:0.75rem;"><i data-lucide="gift" class="i-5 text-primary"></i></div>
          <h4 class="font-semibold mb-1">${r.name}</h4>
          <p class="text-sm text-muted-foreground mb-3">${r.points.toLocaleString()} points</p>
          <button class="btn ${can ? 'btn-primary' : 'btn-outline'} btn-sm w-full" ${can ? '' : 'disabled'} data-points="${r.points}" data-name="${r.name}">${can ? 'Redeem' : 'Locked'}</button>
        </div>
      `;
    }).join("");

    document.getElementById("redeem-grid").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-points]");
      if (!btn) return;
      window.showToast("Reward redeemed", `You used ${btn.dataset.points} points for "${btn.dataset.name}"`);
    });

    if (window.renderIcons) window.renderIcons();
  });
})();
