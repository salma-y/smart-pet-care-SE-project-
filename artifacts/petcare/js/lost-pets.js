(function () {
  const D = window.PetData;

  function fmtDateTime(iso) {
    const d = new Date(iso);
    return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  }

  function renderGrid() {
    const grid = document.getElementById("alerts-grid");
    grid.innerHTML = D.getLostPets().map(a => `
      <div class="card alert-card border-2">
        <div class="alert-card-img">
          <img src="${a.photoUrl}" alt="${a.petName}" />
          <div class="alert-card-img-overlay"></div>
          <div class="missing-badge">Missing</div>
          ${a.reward ? `<div class="reward-badge">Reward: ${a.reward}</div>` : ""}
          <div class="alert-card-img-text">
            <h3 class="text-2xl font-bold mb-1" style="color:#fff;">${a.petName}</h3>
            <p style="color: rgba(255,255,255,0.85); font-weight: 500;">${a.breed}</p>
          </div>
        </div>
        <div class="card-content p-5 flex-1 flex flex-col">
          <div class="flex items-start gap-3 mb-4">
            <i data-lucide="map-pin" class="i-5 text-muted-foreground shrink-0" style="margin-top: 0.125rem;"></i>
            <div>
              <p class="text-xs text-muted-foreground font-semibold uppercase mb-1">Last Seen Location</p>
              <p class="font-medium">${a.lastSeenLocation}</p>
              <p class="text-xs text-muted-foreground mt-1">${fmtDateTime(a.dateLost)}</p>
            </div>
          </div>
          <div class="p-4 rounded-xl text-sm leading-relaxed mb-4 flex-1" style="background: hsl(40 40% 92% / 0.4); color: hsl(210 15% 30%);">
            "${a.description}"
          </div>
        </div>
        <div class="card-footer flex gap-3 pt-0 border-t" style="margin-top: auto;">
          <a class="btn btn-primary btn-h12 flex-1 font-semibold" href="tel:${a.contactPhone}">Contact Owner</a>
          <button class="btn btn-outline btn-h12 flex-1 font-semibold">I've Seen ${a.petName}</button>
        </div>
      </div>
    `).join("");
    window.renderIcons();
  }

  let broadcastState = "idle"; // idle | sending | sent
  let broadcastCount = 0;
  let interval = null;
  let pendingForm = null;

  function renderModal() {
    const c = document.getElementById("report-modal-content");
    if (broadcastState === "idle") {
      c.innerHTML = `
        <form id="report-form">
          <div style="background: var(--destructive); color:#fff; padding: 1.5rem;">
            <h3 class="text-2xl font-bold mb-2" style="color:#fff;">Create Emergency Alert</h3>
            <p style="color: rgba(255,255,255,0.85);">This will send a push notification to all PetWell users within a 5-mile radius of the last seen location.</p>
          </div>
          <div class="modal-body space-y-6">
            <div class="space-y-4">
              <label class="label text-base font-semibold">Which pet is missing?</label>
              <select class="select" name="petId" required style="height: 3rem;">
                <option value="">Select your pet</option>
                ${D.getPets().map(p => `<option value="${p.id}">${p.name} (${p.breed})</option>`).join("")}
              </select>
            </div>
            <div class="space-y-4">
              <label class="label text-base font-semibold">Last Seen Location</label>
              <input class="input" name="location" placeholder="e.g. Intersection of Maple St and 4th Ave" required style="height: 3rem;" />
              <div style="position: relative; width: 100%; height: 10rem; background: hsl(40 40% 92% / 0.5); border-radius: var(--radius-xl); border: 2px dashed var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--muted-foreground); overflow: hidden;">
                <div style="position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(circle at 2px 2px, black 1px, transparent 0); background-size: 24px 24px;"></div>
                <i data-lucide="map" class="i-8 mb-2"></i>
                <span>Map selection area</span>
                <button type="button" class="btn btn-outline btn-sm" style="margin-top: 0.5rem; background: #fff; position: relative; z-index: 1;">Use Current Location</button>
              </div>
            </div>
            <div class="grid" style="grid-template-columns: repeat(2, 1fr); gap: 1rem;">
              <div class="space-y-2">
                <label class="label">Contact Phone</label>
                <input class="input" name="phone" type="tel" placeholder="(555) 123-4567" required />
              </div>
              <div class="space-y-2">
                <label class="label">Reward (Optional)</label>
                <input class="input" name="reward" placeholder="e.g. $200" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="label">Additional Details</label>
              <textarea class="textarea" name="description" placeholder="Collar color, distinct markings, behavioral traits..." style="height: 6rem; resize: none;" required></textarea>
            </div>
          </div>
          <div class="modal-footer" style="background: hsl(40 40% 92% / 0.1);">
            <button type="button" class="btn btn-ghost" data-modal-close>Cancel</button>
            <button type="submit" class="btn btn-destructive px-8">Broadcast Alert</button>
          </div>
        </form>
      `;
      document.getElementById("report-form").addEventListener("submit", (e) => {
        e.preventDefault();
        pendingForm = new FormData(e.currentTarget);
        startBroadcast();
      });
    } else if (broadcastState === "sending") {
      c.innerHTML = `
        <div style="padding: 3rem; text-align: center; min-height: 25rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem;">
          <div style="position: relative;">
            <div style="width: 6rem; height: 6rem; background: hsl(0 70% 60% / 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <i data-lucide="share-2" class="i-10 text-destructive" style="animation: pulse 2s infinite;"></i>
            </div>
            <div style="position: absolute; inset: 0; border: 2px solid var(--destructive); border-radius: 50%; opacity: 0.2; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: absolute; inset: -1.25rem; border: 2px solid var(--destructive); border-radius: 50%; opacity: 0.1; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; animation-delay: 0.5s;"></div>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-2">Broadcasting Alert...</h3>
            <p class="text-muted-foreground">Locating PetWell users in your area</p>
          </div>
          <div class="font-mono font-bold text-destructive tabular-nums" style="font-size: 3rem;" id="broadcast-counter">${broadcastCount.toLocaleString()}</div>
          <p class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Users Alerted</p>
        </div>
      `;
    } else if (broadcastState === "sent") {
      c.innerHTML = `
        <div style="padding: 3rem; text-align: center; min-height: 25rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem;">
          <div style="width: 6rem; height: 6rem; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <i data-lucide="check-circle-2" class="i-10 text-green-600"></i>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-2">Alert Successfully Sent</h3>
            <p class="text-muted-foreground text-lg">
              <span class="font-bold text-foreground">${broadcastCount.toLocaleString()}</span> local pet owners have been notified and are looking out for your pet.
            </p>
          </div>
          <button class="btn btn-primary btn-h12 w-full text-base" id="view-alerts-btn">View Active Alerts</button>
        </div>
      `;
      document.getElementById("view-alerts-btn").addEventListener("click", resetForm);
    }
    window.renderIcons();
  }

  function startBroadcast() {
    broadcastState = "sending";
    broadcastCount = 0;
    renderModal();
    interval = setInterval(() => {
      broadcastCount += 142;
      const counter = document.getElementById("broadcast-counter");
      if (counter) counter.textContent = broadcastCount.toLocaleString();
      if (broadcastCount > 1200) {
        clearInterval(interval);
        broadcastState = "sent";
        // commit alert
        const petId = pendingForm.get("petId");
        const pet = D.getPet(petId);
        D.addLostPet({
          id: Math.random().toString(36).substr(2, 9),
          petName: pet ? pet.name : "Unknown",
          species: pet ? pet.species : "Dog",
          breed: pet ? pet.breed : "Mixed",
          lastSeenLocation: pendingForm.get("location"),
          dateLost: new Date().toISOString(),
          description: pendingForm.get("description"),
          photoUrl: pet ? pet.photoUrl : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
          contactPhone: pendingForm.get("phone"),
          reward: pendingForm.get("reward"),
          status: "Active",
        });
        renderModal();
        renderGrid();
      }
    }, 100);
  }

  function resetForm() {
    closeModal("report-modal");
    setTimeout(() => {
      broadcastState = "idle";
      broadcastCount = 0;
      pendingForm = null;
      renderModal();
    }, 500);
  }

  function init() {
    renderGrid();
    renderModal();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
