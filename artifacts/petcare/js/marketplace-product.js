(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(location.search);
    const id = params.get("id") || "pr1";
    const p = window.VetData.getProduct(id) || window.VetData.getProducts()[0];
    const ownerAllergens = ["Chicken", "Pollen"];

    // Recall banner (Function #20)
    const recall = window.VetData.getRecalls().find((r) => r.productName.toLowerCase().includes(p.name.split(" ")[0].toLowerCase()));
    if (recall) {
      document.getElementById("recall-slot").innerHTML = `
        <div class="drug-warning">
          <i data-lucide="alert-octagon" class="i-6"></i>
          <div>
            <h4>Active recall: ${recall.productName}</h4>
            <p>${recall.reason} — <strong>${recall.action}</strong></p>
            <a href="recalls.html" class="text-sm" style="color:#b91c1c;text-decoration:underline;font-weight:600;">View all recalls →</a>
          </div>
        </div>
      `;
    }

    document.getElementById("pdp").innerHTML = `
      <div>
        <div class="pdp-images"><img src="${p.image}" alt="${p.name}" /></div>
        <div class="pdp-thumbs">
          <div class="pdp-thumb active"><img src="${p.image}" /></div>
          <div class="pdp-thumb"><img src="${p.image}" /></div>
          <div class="pdp-thumb"><img src="${p.image}" /></div>
        </div>
      </div>
      <div class="space-y-4">
        <div>
          <p class="text-sm text-muted-foreground">${p.vendor} · ${p.category}</p>
          <h1 class="text-3xl tracking-tight" style="margin-top:0.25rem;">${p.name}</h1>
          <div class="flex items-center gap-3" style="margin-top:0.5rem;">
            <span class="text-amber-500" style="display:inline-flex;gap:0.125rem;">
              ${[1,2,3,4,5].map((s) => `<i data-lucide="star" class="i-4" ${s <= Math.round(p.rating) ? 'fill="currentColor"' : ''}></i>`).join("")}
            </span>
            <span class="text-sm text-muted-foreground"><strong style="color:var(--foreground);">${p.rating}</strong> · ${p.reviews.toLocaleString()} reviews</span>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          ${p.vetRecommended ? `<span class="badge badge-primary"><i data-lucide="check-circle-2" class="i-3"></i> Vet Recommended</span>` : ""}
          ${p.vetRecommended && p.originalPrice ? `<span class="badge badge-green"><i data-lucide="tag" class="i-3"></i> Vet Pick — Save $${(p.originalPrice - p.price).toFixed(2)}</span>` : ""}
          <span class="diet-badge ${p.dietCompat}">
            <i data-lucide="${p.dietCompat === 'compatible' ? 'check-circle-2' : p.dietCompat === 'incompatible' ? 'x-circle' : 'alert-circle'}" class="i-4"></i>
            Medical Diet — ${p.dietCompat.charAt(0).toUpperCase() + p.dietCompat.slice(1)}
          </span>
        </div>

        <div>
          <span class="text-3xl font-bold">$${p.price.toFixed(2)}</span>
          ${p.originalPrice ? `<span class="product-price-original" style="font-size:1rem;">$${p.originalPrice.toFixed(2)}</span>` : ""}
          <p class="text-sm text-muted-foreground" style="margin-top:0.25rem;">Or 4 payments of $${(p.price / 4).toFixed(2)}</p>
        </div>

        <div class="flex items-center gap-3 border-t border-b" style="padding:1rem 0;">
          <span class="text-sm font-medium">Quantity:</span>
          <div class="qty-stepper" id="qty-stepper">
            <button data-d="-1"><i data-lucide="minus" class="i-3"></i></button>
            <span id="qty-val">1</span>
            <button data-d="1"><i data-lucide="plus" class="i-3"></i></button>
          </div>
        </div>

        <div class="space-y-2">
          ${p.prescription
            ? `<button class="btn btn-primary btn-h12 w-full" id="rx-cta"><i data-lucide="pill" class="i-5"></i> Request Prescription</button>
               <p class="text-xs text-muted-foreground text-center"><i data-lucide="lock" class="i-3"></i> Prescription required — your vet will be contacted</p>`
            : `<button class="btn btn-primary btn-h12 w-full" id="add-cta"><i data-lucide="shopping-cart" class="i-5"></i> Add to Cart</button>
               <button class="btn btn-outline w-full" id="buy-cta">Buy Now</button>`}
        </div>

        <div class="flex items-center gap-3 text-sm text-muted-foreground" style="padding-top:0.5rem;">
          <span class="flex items-center gap-1"><i data-lucide="truck" class="i-4"></i> Free delivery over $49</span>
          <span class="flex items-center gap-1"><i data-lucide="repeat" class="i-4"></i> Auto-ship eligible</span>
        </div>
      </div>
    `;

    // Tabs
    document.getElementById("tab-desc").innerHTML = `<p class="leading-relaxed">${p.description}</p>`;
    document.getElementById("tab-ingredients").innerHTML = `
      <h4 class="font-semibold mb-3">Ingredient list</h4>
      <ul class="space-y-2">
        ${p.ingredients.map((i) => `
          <li class="flex items-center justify-between border-b" style="padding:0.5rem 0;">
            <span>${i}</span>
            ${ownerAllergens.includes(i) ? `<span class="allergen-tag"><i data-lucide="alert-triangle" class="i-3"></i> Allergen for your pet</span>` : ""}
          </li>
        `).join("")}
      </ul>
    `;
    document.getElementById("tab-reviews").innerHTML = `
      <p class="text-sm text-muted-foreground mb-4">${p.reviews.toLocaleString()} verified reviews · Average ${p.rating} stars</p>
      <div class="space-y-3">
        ${[
          { name: "Lauren M.", rating: 5, text: "My dog loves this. We've been buying it for 3 years.", date: "Apr 12, 2024" },
          { name: "Marcus T.", rating: 4, text: "Great quality but shipping took longer than expected.", date: "Mar 28, 2024" },
          { name: "Priya K.", rating: 5, text: "Vet recommended this brand and we noticed real improvement.", date: "Mar 14, 2024" },
        ].map((r) => `
          <div class="card p-4">
            <div class="flex items-center justify-between mb-1">
              <strong style="font-size:0.875rem;">${r.name}</strong>
              <span class="text-xs text-muted-foreground">${r.date}</span>
            </div>
            <span class="text-amber-500" style="display:inline-flex;gap:0.125rem;">${[1,2,3,4,5].map((s) => `<i data-lucide="star" class="i-3" ${s <= r.rating ? 'fill="currentColor"' : ''}></i>`).join("")}</span>
            <p class="text-sm" style="margin-top:0.375rem;">${r.text}</p>
          </div>
        `).join("")}
      </div>
    `;

    document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      document.getElementById("tab-" + t.dataset.tab).classList.add("active");
      if (window.renderIcons) window.renderIcons();
    }));

    // Quantity
    let qty = 1;
    document.getElementById("qty-stepper").addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      qty = Math.max(1, qty + Number(btn.dataset.d));
      document.getElementById("qty-val").textContent = qty;
    });

    // Thumb switching
    document.querySelectorAll(".pdp-thumb").forEach((t) => t.addEventListener("click", () => {
      document.querySelectorAll(".pdp-thumb").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
    }));

    const addBtn = document.getElementById("add-cta");
    if (addBtn) addBtn.addEventListener("click", () => {
      window.VetData.updateCartItem(p.id, qty); // overwrites if exists, else nothing — handle add manually:
      const cart = window.VetData.getCart();
      if (!cart.find((c) => c.productId === p.id)) {
        cart.push({ productId: p.id, quantity: qty, autoShip: false });
      } else {
        window.VetData.updateCartItem(p.id, qty);
      }
      window.showToast("Added to cart", `${p.name} × ${qty}`);
    });
    const buyBtn = document.getElementById("buy-cta");
    if (buyBtn) buyBtn.addEventListener("click", () => window.location.href = "cart.html");
    const rxBtn = document.getElementById("rx-cta");
    if (rxBtn) rxBtn.addEventListener("click", () => window.showToast("Prescription requested", "Your vet has been notified — they'll review and approve."));

    if (window.renderIcons) window.renderIcons();
  });
})();
