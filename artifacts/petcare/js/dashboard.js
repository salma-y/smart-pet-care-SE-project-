(function () {
  const D = window.PetData;

  function renderPetAvatars() {
    const c = document.getElementById("pet-avatars");
    const pets = D.getPets();
    c.innerHTML = pets.map((p) => `
      <a href="pet-detail.html?id=${p.id}" class="avatar hover-lift" style="width:3.5rem; height:3.5rem;">
        <img src="${p.photoUrl}" alt="${p.name}" />
      </a>
    `).join("") + `
      <a href="pets.html" class="btn btn-outline" style="width:3.5rem; height:3.5rem; border-radius:50%; padding:0; font-size:1.125rem; border-width:2px; border-color:var(--background); background:#fff;">+</a>
    `;
  }

  function renderVacAlerts() {
    const alerts = D.getAlertVaccinations();
    const c = document.getElementById("vac-alerts");
    if (alerts.length === 0) { c.innerHTML = ""; return; }
    c.innerHTML = `
      <div class="alert alert-warning">
        <div class="alert-title text-orange-700">
          <i data-lucide="triangle-alert" class="i-4 text-orange-500"></i>
          Vaccination Reminders
        </div>
        <div class="space-y-3" style="margin-top: 0.5rem;">
          ${alerts.map((vac) => {
            const pet = D.getPet(vac.petId);
            return `
              <div class="flex items-center justify-between" style="background:rgba(255,255,255,0.6); padding:0.75rem; border-radius:0.5rem; border:1px solid hsl(25 95% 53% / 0.2);">
                <div class="flex items-center gap-3">
                  <div class="avatar" style="width:2rem; height:2rem;">
                    <img src="${pet.photoUrl}" alt="${pet.name}" />
                  </div>
                  <div>
                    <p class="text-sm font-medium">${pet.name} — ${vac.name}</p>
                    <p class="text-xs text-muted-foreground">
                      ${vac.status === "Overdue"
                        ? `<span class="text-destructive font-medium">Overdue since ${vac.nextDue}</span>`
                        : `Due by ${vac.nextDue}`}
                    </p>
                  </div>
                </div>
                <a href="appointments-new.html?pet=${vac.petId}&type=Vaccination" class="btn btn-outline btn-sm text-orange-700" style="border-color: hsl(25 95% 53% / 0.3);">Schedule</a>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderUpcoming() {
    const list = D.getUpcomingAppointments().slice(0, 3);
    const c = document.getElementById("upcoming-list");
    if (list.length === 0) {
      c.innerHTML = `
        <div class="text-center py-8 text-muted-foreground">
          <i data-lucide="calendar-days" class="i-10 mx-auto mb-3" style="opacity:0.2;"></i>
          <p>No upcoming appointments.</p>
          <a href="appointments-new.html" class="btn btn-link mt-2">Book one now</a>
        </div>`;
      return;
    }
    c.innerHTML = list.map((app) => {
      const pet = D.getPet(app.petId);
      const d = new Date(app.date);
      const month = d.toLocaleString("default", { month: "short" });
      return `
        <div class="flex items-center gap-4 p-4" style="border-radius: var(--radius-xl); border:1px solid var(--border); background: hsl(40 40% 92% / 0.2);">
          <div class="date-block">
            <div class="month">${month}</div>
            <div class="day">${d.getDate()}</div>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold">${app.type}</h4>
            <p class="text-sm text-muted-foreground">${pet.name} • ${app.time}</p>
          </div>
          <a href="appointments.html" class="icon-btn"><i data-lucide="chevron-right" class="i-5 text-muted-foreground"></i></a>
        </div>
      `;
    }).join("");
  }

  function renderPetsList() {
    const c = document.getElementById("pets-list");
    c.innerHTML = D.getPets().map((pet) => `
      <a href="pet-detail.html?id=${pet.id}" class="flex items-center gap-4 p-3" style="border-radius: var(--radius-xl); border:1px solid transparent; transition: all 0.15s;" onmouseover="this.style.background='hsl(40 40% 92% / 0.5)'; this.style.borderColor='var(--border)'" onmouseout="this.style.background='transparent'; this.style.borderColor='transparent'">
        <div class="avatar" style="width:3rem;height:3rem;">
          <img src="${pet.photoUrl}" alt="${pet.name}" />
        </div>
        <div class="flex-1">
          <h4 class="font-semibold">${pet.name}</h4>
          <p class="text-sm text-muted-foreground">${pet.species} • ${pet.age}</p>
        </div>
        <span class="badge badge-outline">${pet.weight} kg</span>
      </a>
    `).join("");
  }

  // Toggle emergency
  let emergency = false;
  document.getElementById("toggle-emergency").addEventListener("click", () => {
    emergency = !emergency;
    const card = document.getElementById("status-card");
    const icon = document.getElementById("status-icon");
    const title = document.getElementById("status-title");
    const desc = document.getElementById("status-desc");
    if (emergency) {
      card.classList.add("alert");
      icon.innerHTML = `<i data-lucide="triangle-alert" class="i-5"></i>`;
      title.textContent = "Requires attention: Mochi — Limping on right paw";
      desc.textContent = "Reported today at 9:00 AM.";
    } else {
      card.classList.remove("alert");
      icon.innerHTML = `<i data-lucide="activity" class="i-5"></i>`;
      title.textContent = "Health Status: All Clear";
      desc.textContent = "No urgent issues reported across your pets.";
    }
    window.renderIcons();
  });

  function init() {
    renderPetAvatars();
    renderVacAlerts();
    renderUpcoming();
    renderPetsList();
    window.renderIcons();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
