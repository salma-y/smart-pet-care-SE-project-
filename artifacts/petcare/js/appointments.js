(function () {
  const D = window.PetData;

  function fmtDate(iso) {
    const d = new Date(iso);
    return {
      month: d.toLocaleString("default", { month: "short" }),
      day: d.getDate(),
      year: d.getFullYear(),
    };
  }

  function appointmentCard(app) {
    const pet = D.getPet(app.petId);
    const vet = D.getVet(app.vetId);
    const dt = fmtDate(app.date);
    const statusClass =
      app.status === "Upcoming" ? "badge-primary" :
      app.status === "Completed" ? "badge-green" : "badge-secondary";

    return `
      <div class="card border" style="overflow: hidden;">
        <div class="flex flex-col md:flex-row">
          <div class="bg-secondary-tint p-6 flex md:flex-col items-center justify-center gap-4" style="width: 100%; max-width: 10rem; border-right: 1px solid var(--border);">
            <div class="text-center">
              <div class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">${dt.month}</div>
              <div class="text-3xl font-bold">${dt.day}</div>
              <div class="text-sm text-muted-foreground">${dt.year}</div>
            </div>
            <span class="badge ${statusClass}">${app.status}</span>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-bold mb-1">${app.type}</h3>
                  <div class="flex items-center gap-2 text-muted-foreground text-sm">
                    <i data-lucide="clock" class="i-4"></i> ${app.time}
                  </div>
                </div>
                <div class="avatar" style="width:2.5rem; height:2.5rem; border:1px solid var(--border);">
                  <img src="${pet.photoUrl}" alt="${pet.name}" />
                </div>
              </div>

              <div class="flex items-center gap-3 p-3 rounded-lg mb-4" style="background: hsl(40 40% 92% / 0.2); border: 1px solid hsl(40 20% 88% / 0.5);">
                <div class="avatar" style="width:2rem; height:2rem;">
                  <img src="${vet.photoUrl}" alt="${vet.name}" />
                </div>
                <div>
                  <p class="text-sm font-medium">${vet.name}</p>
                  <p class="text-xs text-muted-foreground">${vet.specialty}</p>
                </div>
              </div>

              ${app.notes ? `
                <div class="flex gap-2 text-sm text-muted-foreground">
                  <i data-lucide="file-text" class="i-4 shrink-0 mt-1"></i>
                  <p class="italic">"${app.notes}"</p>
                </div>
              ` : ""}
            </div>

            ${app.status === "Upcoming" ? `
              <div class="flex gap-3 mt-6 pt-4 border-t">
                <button class="btn btn-outline flex-1">Reschedule</button>
                <button class="btn btn-outline flex-1 text-destructive">Cancel</button>
              </div>
            ` : ""}
            ${app.status === "Completed" ? `
              <div class="flex gap-3 mt-6 pt-4 border-t">
                <a class="btn btn-outline flex-1" href="pet-detail.html?id=${app.petId}">View Medical Record</a>
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    `;
  }

  function init() {
    const upcoming = D.getUpcomingAppointments();
    const past = D.getPastAppointments();
    document.getElementById("tab-upcoming").textContent = `Upcoming (${upcoming.length})`;

    const upcomingC = document.getElementById("upcoming-content");
    upcomingC.innerHTML = upcoming.length > 0
      ? upcoming.map(appointmentCard).join("")
      : `
        <div class="text-center py-16 card border-dashed">
          <i data-lucide="calendar-days" class="i-10 mx-auto mb-4" style="opacity:0.3;"></i>
          <h3 class="text-lg font-medium mb-2">No upcoming appointments</h3>
          <p class="text-muted-foreground mb-6">Your pets are all caught up on their visits.</p>
          <a class="btn btn-outline" href="appointments-new.html">Book a Checkup</a>
        </div>
      `;

    const pastC = document.getElementById("past-content");
    pastC.innerHTML = past.length > 0
      ? past.map(appointmentCard).join("")
      : `<div class="text-center py-16 card border-dashed"><p class="text-muted-foreground">No past appointments found.</p></div>`;

    document.querySelectorAll(".tab").forEach((t) => {
      t.addEventListener("click", () => {
        const target = t.dataset.tab;
        document.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x === t));
        document.querySelectorAll(".tab-content").forEach(x => x.classList.toggle("active", x.dataset.tabContent === target));
      });
    });

    window.renderIcons();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
