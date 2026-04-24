(function () {
  const D = window.PetData;
  const root = document.getElementById("booking-root");
  const params = new URLSearchParams(window.location.search);

  const pets = D.getPets();
  const vets = D.getVets();
  const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "01:30 PM", "02:00 PM", "03:30 PM", "04:00 PM"];

  const state = {
    step: 1,
    petId: params.get("pet") || pets[0].id,
    type: params.get("type") || "Consultation",
    notes: "",
    vetId: "",
    date: "",
    time: "",
    success: false,
  };

  function fmtNiceDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  function fmtShortDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function summary() {
    const pet = D.getPet(state.petId);
    const vet = D.getVet(state.vetId);
    return `
      <div class="card card-soft sticky" style="top: 6rem; background: hsl(160 47% 45% / 0.05); border: 1px solid hsl(160 47% 45% / 0.1);">
        <div class="card-header"><h3 class="card-title">Booking Summary</h3></div>
        <div class="card-content space-y-6">
          <div class="flex items-center gap-4 pb-4" style="border-bottom: 1px solid hsl(160 47% 45% / 0.1);">
            <div class="avatar" style="width:3rem; height:3rem; background:#fff;">
              <img src="${pet ? pet.photoUrl : ""}" alt="" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Patient</p>
              <p class="font-semibold">${pet ? pet.name : "Not selected"}</p>
            </div>
          </div>
          <div class="pb-4" style="border-bottom: 1px solid hsl(160 47% 45% / 0.1);">
            <p class="text-sm text-muted-foreground mb-1">Reason for Visit</p>
            <p class="font-semibold">${state.type}</p>
          </div>
          <div class="flex items-center gap-4 pb-4" style="border-bottom: 1px solid hsl(160 47% 45% / 0.1);">
            ${vet ? `
              <div class="avatar" style="width:2.5rem; height:2.5rem; background:#fff;">
                <img src="${vet.photoUrl}" alt="" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Provider</p>
                <p class="font-semibold">${vet.name}</p>
              </div>
            ` : `
              <div>
                <p class="text-sm text-muted-foreground">Provider</p>
                <p class="font-semibold italic" style="opacity: 0.5;">Not selected</p>
              </div>
            `}
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-1">Schedule</p>
            ${state.date && state.time ? `
              <div class="flex items-center gap-2 text-primary font-medium p-3" style="background:#fff; border-radius: 0.5rem; border: 1px solid hsl(160 47% 45% / 0.2); box-shadow: var(--shadow-sm);">
                <i data-lucide="calendar" class="i-4"></i>
                <span>${fmtNiceDate(state.date)} at ${state.time}</span>
              </div>
            ` : `<p class="font-semibold italic" style="opacity: 0.5;">Not selected</p>`}
          </div>
        </div>
      </div>
    `;
  }

  function step1Card() {
    return `
      <div class="card card-soft fade-in">
        <div class="card-header">
          <h3 class="card-title">Visit Details</h3>
          <p class="card-description">Who is this appointment for and what do they need?</p>
        </div>
        <div class="card-content space-y-8">
          <div class="space-y-4">
            <label class="label text-base">Select Pet</label>
            <div class="grid sm:grid-cols-3 gap-4" id="pet-grid">
              ${pets.map(p => `
                <button type="button" class="radio-card ${state.petId === p.id ? "selected" : ""}" data-pet="${p.id}">
                  <div class="avatar mb-3" style="width:3rem; height:3rem;">
                    <img src="${p.photoUrl}" alt="${p.name}" />
                  </div>
                  <span class="font-semibold">${p.name}</span>
                </button>
              `).join("")}
            </div>
          </div>
          <div class="space-y-4">
            <label class="label text-base">Appointment Type</label>
            <select class="select" id="type-select" style="height: 3rem;">
              ${["Consultation","Vaccination","Checkup","Surgery","Grooming"].map(t => `<option value="${t}" ${state.type === t ? "selected" : ""}>${t === "Consultation" ? "General Consultation" : t === "Vaccination" ? "Vaccination Update" : t === "Checkup" ? "Annual Checkup" : t === "Surgery" ? "Surgery / Procedure" : t}</option>`).join("")}
            </select>
          </div>
          <div class="space-y-4">
            <label class="label text-base">Additional Notes (Optional)</label>
            <textarea class="textarea" id="notes-input" placeholder="Please describe the reason for your visit..." style="height: 6rem; resize: none;">${state.notes}</textarea>
          </div>
          <button class="btn btn-primary btn-h12 w-full text-base" id="next-1">Continue to Provider Selection</button>
        </div>
      </div>
    `;
  }

  function step2Card() {
    return `
      <div class="card card-soft fade-in">
        <div class="card-header">
          <h3 class="card-title">Select a Veterinarian</h3>
          <p class="card-description">Choose from our available professionals</p>
        </div>
        <div class="card-content space-y-4">
          <div class="space-y-4" id="vet-list">
            ${vets.map(v => `
              <button type="button" class="radio-row ${state.vetId === v.id ? "selected" : ""}" data-vet="${v.id}" style="width: 100%; text-align: left;">
                <div class="avatar" style="width:4rem; height:4rem; border:1px solid var(--border);">
                  <img src="${v.photoUrl}" alt="${v.name}" />
                </div>
                <div class="flex-1 space-y-1">
                  <div class="flex justify-between items-start gap-2">
                    <span class="font-semibold text-lg">${v.name}</span>
                    <span class="badge badge-amber"><i data-lucide="star" class="i-3" fill="currentColor"></i> ${v.rating} (${v.reviews})</span>
                  </div>
                  <p class="text-sm text-muted-foreground">${v.specialty} • ${v.distance} away</p>
                  <p class="text-xs font-medium text-primary mt-2">Next available: ${v.nextAvailable}</p>
                </div>
              </button>
            `).join("")}
          </div>
          <div class="flex gap-4 pt-6">
            <button class="btn btn-outline btn-h12 w-full" id="back-2">Back</button>
            <button class="btn btn-primary btn-h12 w-full" id="next-2" ${!state.vetId ? "disabled" : ""}>Continue to Date & Time</button>
          </div>
        </div>
      </div>
    `;
  }

  function step3Card() {
    const today = new Date().toISOString().split("T")[0];
    return `
      <div class="card card-soft fade-in">
        <div class="card-header">
          <h3 class="card-title">Date & Time</h3>
          <p class="card-description">When would you like to come in?</p>
        </div>
        <div class="card-content space-y-8">
          <div class="flex flex-col md:flex-row gap-8">
            <div class="flex-1">
              <label class="label">Select Date</label>
              <input type="date" class="input" id="date-input" min="${today}" value="${state.date}" style="height: 3rem; font-size: 1rem;" />
            </div>
            <div class="flex-1 space-y-4">
              <label class="label text-base">Available Slots ${state.date ? `on ${fmtShortDate(state.date)}` : ""}</label>
              ${state.date ? `
                <div class="grid" style="grid-template-columns: repeat(2, 1fr); gap: 0.75rem;" id="slots-grid">
                  ${timeSlots.map(s => `
                    <button type="button" data-slot="${s}" class="${state.time === s ? "btn btn-primary" : "btn btn-outline"}" style="padding: 0.75rem; font-size: 0.875rem; font-weight: 500;">${s}</button>
                  `).join("")}
                </div>
              ` : `
                <div class="text-center text-muted-foreground border-2 border-dashed rounded-xl p-8" style="background: hsl(40 40% 92% / 0.2);">Please select a date first</div>
              `}
            </div>
          </div>
          <div class="flex gap-4 pt-6">
            <button class="btn btn-outline btn-h12 w-full" id="back-3">Back</button>
            <button class="btn btn-primary btn-h12 w-full" id="confirm-btn" ${!state.date || !state.time ? "disabled" : ""}>Confirm Booking</button>
          </div>
        </div>
      </div>
    `;
  }

  function successView() {
    const pet = D.getPet(state.petId);
    const vet = D.getVet(state.vetId);
    return `
      <div class="flex flex-col items-center justify-center text-center" style="padding: 2rem; min-height: 80vh;">
        <div class="mx-auto mb-6" style="width: 5rem; height: 5rem; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <i data-lucide="check-circle-2" class="i-10 text-green-600"></i>
        </div>
        <h1 class="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        <p class="text-muted-foreground max-w-md mb-8 text-lg">
          You're all set. We've sent a confirmation email with details for ${pet ? pet.name : ""}'s appointment.
        </p>
        <div class="card mb-8 text-left w-full" style="max-width: 28rem; background: hsl(40 40% 92% / 0.3); border: 0;">
          <div class="card-content space-y-4 p-6">
            <div class="flex justify-between"><span class="text-muted-foreground">Pet</span><span class="font-medium">${pet ? pet.name : ""}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Type</span><span class="font-medium">${state.type}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Date & Time</span><span class="font-medium">${fmtNiceDate(state.date)} at ${state.time}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Veterinarian</span><span class="font-medium">${vet ? vet.name : ""}</span></div>
          </div>
        </div>
        <a class="btn btn-primary btn-lg px-8" href="appointments.html">View My Appointments</a>
      </div>
    `;
  }

  function render() {
    if (state.success) {
      root.innerHTML = successView();
      window.renderIcons();
      return;
    }

    const stepCard =
      state.step === 1 ? step1Card() :
      state.step === 2 ? step2Card() :
      step3Card();

    root.innerHTML = `
      <div class="flex items-center gap-4 mb-8">
        <a class="btn btn-ghost btn-icon" href="appointments.html" aria-label="Back">
          <i data-lucide="arrow-left" class="i-5"></i>
        </a>
        <div>
          <h1 class="text-2xl font-bold">Book Appointment</h1>
          <p class="text-muted-foreground">Step ${state.step} of 3</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">${stepCard}</div>
        <div class="lg:col-span-1">${summary()}</div>
      </div>
    `;
    bind();
    window.renderIcons();
  }

  function bind() {
    if (state.step === 1) {
      root.querySelectorAll("[data-pet]").forEach(b => b.addEventListener("click", () => { state.petId = b.dataset.pet; render(); }));
      root.querySelector("#type-select").addEventListener("change", e => { state.type = e.target.value; render(); });
      root.querySelector("#notes-input").addEventListener("input", e => { state.notes = e.target.value; });
      root.querySelector("#next-1").addEventListener("click", () => { state.step = 2; render(); });
    } else if (state.step === 2) {
      root.querySelectorAll("[data-vet]").forEach(b => b.addEventListener("click", () => { state.vetId = b.dataset.vet; render(); }));
      root.querySelector("#back-2").addEventListener("click", () => { state.step = 1; render(); });
      root.querySelector("#next-2").addEventListener("click", () => { if (state.vetId) { state.step = 3; render(); } });
    } else if (state.step === 3) {
      root.querySelector("#date-input").addEventListener("change", e => { state.date = e.target.value; render(); });
      const slots = root.querySelector("#slots-grid");
      if (slots) slots.querySelectorAll("[data-slot]").forEach(b => b.addEventListener("click", () => { state.time = b.dataset.slot; render(); }));
      root.querySelector("#back-3").addEventListener("click", () => { state.step = 2; render(); });
      root.querySelector("#confirm-btn").addEventListener("click", () => {
        if (state.date && state.time) {
          const pet = D.getPet(state.petId);
          window.showToast("Appointment Confirmed", `Your booking for ${pet ? pet.name : ""} has been confirmed.`);
          state.success = true;
          render();
        }
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
