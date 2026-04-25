(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(location.search);
    const state = {
      cat: "All",
      vetOnly: params.get("vetRec") === "1",
      term: "",
      sort: "rec",
    };
    if (state.vetOnly) document.getElementById("vet-only").checked = true;

    // Allergen banner — shows if owner's pet has known allergens that match products in results
    function renderAllergenBanner() {
      const ownerAllergens = ["Chicken", "Pollen"]; // Mochi's allergies
      const visibleProducts = filtered();
      const triggers = new Set();
      visibleProducts.forEach((p) => {
        p.allergenWarnings.forEach((a) => { if (ownerAllergens.includes(a)) triggers.add(a); });
      });
      const slot = document.getElementById("allergen-slot");
      if (triggers.size > 0) {
        slot.innerHTML = `
          <div class="allergen-banner">
            <i data-lucide="alert-triangle" class="i-5"></i>
            <div>
              <strong style="color:#7c2d12;font-size:0.9375rem;">Allergy alert for Mochi</strong>
              <p class="text-sm" style="color:#7c2d12;">Some products in your results contain known allergens: <strong>${Array.from(triggers).join(", ")}</strong>. Look for the warning tag.</p>
            </div>
          </div>
        `;
      } else {
        slot.innerHTML = "";
      }
    }

    function filtered() {
      let list = window.VetData.getProductsByCategory(state.cat);
      if (state.vetOnly) list = list.filter((p) => p.vetRecommended);
      if (state.term) list = list.filter((p) => p.name.toLowerCase().includes(state.term) || p.vendor.toLowerCase().includes(state.term));
      if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
      else if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
      else if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);
      return list;
    }

    function render() {
      const list = filtered();
      const ownerAllergens = ["Chicken", "Pollen"];
      document.getElementById("result-count").textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;
      document.getElementById("product-grid").innerHTML = list.length === 0
        ? `<div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-state-icon"><i data-lucide="package-x" class="i-6"></i></div>
            <p>No products match your filters.</p>
          </div>`
        : list.map((p) => {
            const triggered = p.allergenWarnings.some((a) => ownerAllergens.includes(a));
            return `
              <a href="marketplace-product.html?id=${p.id}" class="product-card">
                <div class="product-card-img">
                  <img src="${p.image}" alt="${p.name}" />
                  ${p.vetRecommended ? `<span class="product-vet-badge"><i data-lucide="check-circle-2" class="i-3"></i> Vet Pick</span>` : ""}
                  ${p.prescription ? `<span class="product-rx-lock" title="Prescription required"><i data-lucide="lock" class="i-4"></i></span>` : ""}
                </div>
                <div class="product-card-body">
                  <p class="text-xs text-muted-foreground">${p.vendor}</p>
                  <h4 class="product-name">${p.name}${triggered ? '<span class="allergen-tag"><i data-lucide="alert-triangle" class="i-3"></i> Allergen</span>' : ''}</h4>
                  <div class="product-rating">
                    <span class="text-amber-500"><i data-lucide="star" class="i-3" fill="currentColor"></i></span>
                    <span><strong style="color:var(--foreground);">${p.rating}</strong> (${p.reviews.toLocaleString()})</span>
                  </div>
                  <div>
                    <span class="product-price">$${p.price.toFixed(2)}</span>
                    ${p.originalPrice ? `<span class="product-price-original">$${p.originalPrice.toFixed(2)}</span>` : ""}
                  </div>
                </div>
              </a>
            `;
          }).join("");
      renderAllergenBanner();
      if (window.renderIcons) window.renderIcons();
    }

    document.getElementById("cats").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      document.querySelectorAll("#cats .chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.cat = chip.dataset.cat;
      render();
    });
    document.getElementById("q").addEventListener("input", (e) => { state.term = e.target.value.toLowerCase(); render(); });
    document.getElementById("vet-only").addEventListener("change", (e) => { state.vetOnly = e.target.checked; render(); });
    document.getElementById("sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });

    render();
  });
})();
