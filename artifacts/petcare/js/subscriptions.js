(function () {
  document.addEventListener("DOMContentLoaded", function () {
    function render() {
      const subs = window.VetData.getSubscriptions();
      const el = document.getElementById("subs-list");
      if (subs.length === 0) {
        el.innerHTML = `
          <div class="card card-soft empty-state">
            <div class="empty-state-icon"><i data-lucide="repeat" class="i-6"></i></div>
            <h3 class="font-semibold mb-2">No active subscriptions</h3>
            <p class="text-sm mb-4">Set up auto-ship from any product page to save 10%.</p>
            <a href="marketplace.html" class="btn btn-primary">Browse products</a>
          </div>
        `;
        if (window.renderIcons) window.renderIcons();
        return;
      }

      el.innerHTML = subs.map((s) => {
        const product = window.VetData.getProduct(s.productId);
        return `
          <div class="card card-soft">
            <div class="card-content">
              <div class="grid" style="grid-template-columns: 5rem 1fr; gap:1rem;align-items:center;">
                <div class="cart-row-img"><img src="${product ? product.image : ''}" alt=""/></div>
                <div>
                  <div class="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <h3 class="font-semibold" style="font-size:1.0625rem;">${s.productName}</h3>
                      <p class="text-sm text-muted-foreground">$${s.price.toFixed(2)} every ${s.frequency.toLowerCase()}</p>
                    </div>
                    <span class="badge ${s.status === 'Active' ? 'badge-green' : 'badge-secondary'}">${s.status}</span>
                  </div>

                  <div class="grid sm:grid-cols-2 gap-4" style="margin-top:1rem;">
                    <div>
                      <label class="label">Next delivery</label>
                      <p class="text-base font-semibold">${new Date(s.nextDelivery).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <div>
                      <label class="label">Adjust delivery date (days)</label>
                      <input type="range" min="-14" max="14" value="0" class="slider" data-sub="${s.id}" />
                      <p class="text-xs text-muted-foreground" data-out="${s.id}">No change</p>
                    </div>
                  </div>

                  <div class="flex gap-2 flex-wrap" style="margin-top:1rem;">
                    <button class="btn btn-outline btn-sm" data-action="edit" data-id="${s.id}"><i data-lucide="settings" class="i-4"></i> Edit</button>
                    <button class="btn btn-outline btn-sm" data-action="pause" data-id="${s.id}"><i data-lucide="${s.status === 'Paused' ? 'play' : 'pause'}" class="i-4"></i> ${s.status === 'Paused' ? 'Resume' : 'Pause'}</button>
                    <button class="btn btn-outline btn-sm text-destructive" data-action="cancel" data-id="${s.id}"><i data-lucide="x" class="i-4"></i> Cancel</button>
                    <a href="marketplace-product.html?id=${s.productId}" class="btn btn-ghost btn-sm" style="margin-left:auto;">View product →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("");

      el.querySelectorAll("[data-action]").forEach((b) => b.addEventListener("click", () => {
        const id = b.dataset.id;
        const action = b.dataset.action;
        if (action === "pause") { window.VetData.pauseSubscription(id); render(); window.showToast("Subscription updated"); }
        if (action === "cancel") { if (confirm("Cancel this subscription?")) { window.VetData.cancelSubscription(id); render(); window.showToast("Subscription cancelled"); } }
        if (action === "edit") window.showToast("Edit panel", "Subscription editor would open here.");
      }));

      el.querySelectorAll("input[data-sub]").forEach((slider) => slider.addEventListener("input", () => {
        const out = el.querySelector(`[data-out="${slider.dataset.sub}"]`);
        const v = Number(slider.value);
        out.textContent = v === 0 ? "No change" : (v > 0 ? `Delay by ${v} day${v !== 1 ? 's' : ''}` : `Move up by ${-v} day${v !== -1 ? 's' : ''}`);
      }));

      if (window.renderIcons) window.renderIcons();
    }
    render();
  });
})();
