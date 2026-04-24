(function () {
  const D = window.PetData;

  function renderGrid() {
    const grid = document.getElementById("pets-grid");
    grid.innerHTML = D.getPets().map((pet) => `
      <div class="card border-2" style="overflow:hidden;">
        <div style="height: 12rem; overflow:hidden; position:relative;">
          <img src="${pet.photoUrl}" alt="${pet.name}" style="width:100%; height:100%; object-fit:cover;" />
          <div style="position:absolute; top:1rem; right:1rem;">
            <span class="badge" style="background:rgba(255,255,255,0.9); color:var(--foreground); backdrop-filter: blur(4px);">${pet.species}</span>
          </div>
        </div>
        <div class="card-header pb-2">
          <h3 class="text-2xl font-bold mb-1">${pet.name}</h3>
          <p class="text-sm font-medium text-primary">${pet.breed}</p>
        </div>
        <div class="card-content pb-4">
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="badge badge-secondary"><i data-lucide="calendar" class="i-3"></i> ${pet.age}</span>
            <span class="badge badge-secondary"><i data-lucide="activity" class="i-3"></i> ${pet.weight} kg</span>
            ${pet.allergies.length > 0 ? `<span class="badge badge-orange"><i data-lucide="info" class="i-3"></i> ${pet.allergies.length} Allergies</span>` : ""}
          </div>
        </div>
        <div class="card-footer">
          <a href="pet-detail.html?id=${pet.id}" class="btn w-full" style="background: hsl(160 47% 45% / 0.1); color: var(--primary);" onmouseover="this.style.background='var(--primary)'; this.style.color='var(--primary-foreground)'" onmouseout="this.style.background='hsl(160 47% 45% / 0.1)'; this.style.color='var(--primary)'">View Medical Record</a>
        </div>
      </div>
    `).join("");
    window.renderIcons();
  }

  document.getElementById("add-pet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newPet = {
      id: Math.random().toString(36).substr(2, 9),
      name: fd.get("name"),
      species: fd.get("species"),
      breed: fd.get("breed"),
      age: fd.get("age"),
      weight: Number(fd.get("weight")),
      photoUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
      allergies: [],
      ownerNotes: fd.get("notes"),
    };
    D.addPet(newPet);
    e.target.reset();
    closeModal("add-pet-modal");
    renderGrid();
    window.showToast("Pet Added", `${newPet.name} has been added to your family.`);
  });

  function init() { renderGrid(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
