(function () {
  document.addEventListener("DOMContentLoaded", function () {
    function render() {
      const cart = window.VetData.getCart();
      const itemsEl = document.getElementById("cart-items");
      const summaryEl = document.getElementById("summary");

      if (cart.length === 0) {
        itemsEl.innerHTML = `
          <div class="card card-soft empty-state">
            <div class="empty-state-icon"><i data-lucide="shopping-cart" class="i-6"></i></div>
            <h3 class="font-semibold mb-2">Your cart is empty</h3>
            <p class="text-sm mb-4">Browse the marketplace to find vet-recommended essentials.</p>
            <a href="marketplace.html" class="btn btn-primary">Continue shopping</a>
          </div>
        `;
        summaryEl.innerHTML = "";
        if (window.renderIcons) window.renderIcons();
        return;
      }

      // Group by vendor (Function #18)
      const byVendor = {};
      cart.forEach((c) => {
        const p = window.VetData.getProduct(c.productId);
        if (!p) return;
        (byVendor[p.vendor] = byVendor[p.vendor] || []).push({ ...c, product: p });
      });

      itemsEl.innerHTML = `
        <div class="alert alert-warning" style="margin-bottom:1rem;">
          <div class="alert-title"><i data-lucide="package" class="i-5"></i> Order consolidation</div>
          <p class="text-sm">All items will be combined into <strong>1 delivery</strong> from our fulfillment center.</p>
        </div>
        ${Object.entries(byVendor).map(([vendor, list]) => `
          <div class="card card-soft" style="margin-bottom:1rem;">
            <div class="card-header pb-2 flex items-center justify-between">
              <div>
                <h3 class="text-base font-semibold">${vendor}</h3>
                <p class="text-xs text-muted-foreground">Vendor · ${list.length} item${list.length !== 1 ? 's' : ''}</p>
              </div>
              <span class="badge badge-secondary">Multi-vendor</span>
            </div>
            <div class="card-content">
              ${list.map((it) => `
                <div class="cart-row">
                  <div class="cart-row-img"><img src="${it.product.image}" alt="${it.product.name}" /></div>
                  <div>
                    <h4 style="font-size:0.9375rem;font-weight:600;">${it.product.name}</h4>
                    <p class="text-xs text-muted-foreground">${it.product.category}</p>
                    <div class="flex items-center gap-3" style="margin-top:0.5rem;">
                      <div class="qty-stepper">
                        <button data-pid="${it.productId}" data-d="-1"><i data-lucide="minus" class="i-3"></i></button>
                        <span>${it.quantity}</span>
                        <button data-pid="${it.productId}" data-d="1"><i data-lucide="plus" class="i-3"></i></button>
                      </div>
                      <label class="flex items-center gap-2 text-sm" style="cursor:pointer;">
                        <span class="switch">
                          <input type="checkbox" data-autoship="${it.productId}" ${it.autoShip ? "checked" : ""}>
                          <span class="slider-toggle"></span>
                        </span>
                        Auto-ship
                      </label>
                      <button class="btn btn-ghost btn-sm text-destructive" data-remove="${it.productId}">Remove</button>
                    </div>
                  </div>
                  <div class="text-right">
                    <strong>$${(it.product.price * it.quantity).toFixed(2)}</strong>
                    ${it.autoShip ? `<p class="text-xs text-primary">10% off w/ auto-ship</p>` : ""}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      `;

      // Summary
      const subtotal = cart.reduce((sum, c) => {
        const p = window.VetData.getProduct(c.productId);
        return sum + (p ? p.price * c.quantity : 0);
      }, 0);
      const autoShipDiscount = cart.reduce((sum, c) => {
        if (!c.autoShip) return sum;
        const p = window.VetData.getProduct(c.productId);
        return sum + (p ? p.price * c.quantity * 0.10 : 0);
      }, 0);
      const shipping = subtotal >= 49 ? 0 : 5.99;
      const taxRate = 0.0875;
      const taxable = subtotal - autoShipDiscount;
      const tax = taxable * taxRate;
      const total = taxable + shipping + tax;

      summaryEl.innerHTML = `
        <div class="flex items-center justify-between text-sm"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
        ${autoShipDiscount > 0 ? `<div class="flex items-center justify-between text-sm" style="color:var(--primary);"><span>Auto-ship discount (10%)</span><span>− $${autoShipDiscount.toFixed(2)}</span></div>` : ""}
        <div class="flex items-center justify-between text-sm"><span>Shipping</span><span>${shipping === 0 ? '<span class="text-primary">FREE</span>' : '$' + shipping.toFixed(2)}</span></div>
        <div class="flex items-center justify-between text-sm"><span>Tax (8.75%)</span><span>$${tax.toFixed(2)}</span></div>
        <div class="border-t" style="padding-top:0.75rem;">
          <div class="flex items-center justify-between">
            <strong style="font-size:1.125rem;">Total</strong>
            <strong style="font-size:1.5rem;">$${total.toFixed(2)} <span class="text-sm text-muted-foreground" style="font-weight:500;">USD</span></strong>
          </div>
          <p class="text-xs text-muted-foreground" style="margin-top:0.25rem;">Currency · USD · Switch in settings</p>
        </div>
        <button class="btn btn-primary btn-h12 w-full" id="checkout"><i data-lucide="lock" class="i-4"></i> Secure Checkout</button>
        <p class="text-xs text-muted-foreground text-center" style="margin-top:0.5rem;">Earn ${Math.floor(total * 10)} loyalty points</p>
      `;

      // Bind events
      itemsEl.querySelectorAll(".qty-stepper button").forEach((btn) => btn.addEventListener("click", () => {
        const cur = window.VetData.getCart().find((c) => c.productId === btn.dataset.pid);
        if (!cur) return;
        window.VetData.updateCartItem(btn.dataset.pid, cur.quantity + Number(btn.dataset.d));
        render();
      }));
      itemsEl.querySelectorAll("[data-remove]").forEach((btn) => btn.addEventListener("click", () => {
        window.VetData.updateCartItem(btn.dataset.remove, 0);
        render();
      }));
      itemsEl.querySelectorAll("[data-autoship]").forEach((cb) => cb.addEventListener("change", () => {
        window.VetData.toggleCartAutoShip(cb.dataset.autoship);
        render();
      }));
      summaryEl.querySelector("#checkout").addEventListener("click", () => window.showToast("Checkout simulated", "Your order would be placed here."));

      if (window.renderIcons) window.renderIcons();
    }

    render();
  });
})();
