(function () {
  const START_HOUR = 8;
  const END_HOUR = 18;

  function timeToMinutes(t) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
  function minutesToTop(m) { return ((m - START_HOUR * 60) / 30) * 3.5; } // 3.5rem per 30 min

  function overlap(a, b) {
    return timeToMinutes(a.start) < timeToMinutes(b.end) && timeToMinutes(b.start) < timeToMinutes(a.end);
  }

  function findConflicts(slots) {
    const conflicts = new Set();
    const byRoom = {};
    slots.forEach((s) => { (byRoom[s.roomId] = byRoom[s.roomId] || []).push(s); });
    Object.values(byRoom).forEach((arr) => {
      for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) {
        if (overlap(arr[i], arr[j])) { conflicts.add(arr[i].id); conflicts.add(arr[j].id); }
      }
    });
    return conflicts;
  }

  function renderGrid() {
    const rooms = window.VetData.getSurgeryRooms();
    const slots = window.VetData.getSurgerySlots();
    const wrap = document.getElementById("surgery-grid-wrap");
    const conflicts = findConflicts(slots);

    const halfHourCount = (END_HOUR - START_HOUR) * 2;
    const timeSlots = [];
    for (let h = START_HOUR; h < END_HOUR; h++) {
      timeSlots.push(`${String(h).padStart(2, "0")}:00`);
      timeSlots.push(`${String(h).padStart(2, "0")}:30`);
    }

    wrap.style.setProperty("--surgery-rooms", rooms.length);
    wrap.innerHTML = `
      <div class="surgery-grid" style="--surgery-rooms:${rooms.length};">
        <div class="surgery-grid-header" style="--surgery-rooms:${rooms.length};">
          <div></div>
          ${rooms.map((r) => `<div>${r.name}<small style="display:block;color:var(--muted-foreground);font-weight:500;">${r.equipment[0]}</small></div>`).join("")}
        </div>
        <div class="surgery-body" style="--surgery-rooms:${rooms.length};">
          <div class="surgery-time-col">
            ${timeSlots.map((t) => `<div class="surgery-time">${t}</div>`).join("")}
          </div>
          ${rooms.map((r) => `
            <div class="surgery-room-col" style="position:relative;">
              ${timeSlots.map(() => `<div class="surgery-row"></div>`).join("")}
              ${slots.filter((s) => s.roomId === r.id).map((s) => {
                const top = minutesToTop(timeToMinutes(s.start));
                const height = ((timeToMinutes(s.end) - timeToMinutes(s.start)) / 30) * 3.5;
                const isConflict = conflicts.has(s.id);
                return `
                  <div class="surgery-block ${isConflict ? 'conflict' : ''}" style="top:${top}rem;height:${height}rem;">
                    <strong>${s.patient}</strong>
                    <small>${s.procedure}</small>
                    <small>${s.start}–${s.end} · ${s.surgeon.replace("Dr. ", "")}</small>
                  </div>
                `;
              }).join("")}
            </div>
          `).join("")}
        </div>
      </div>
    `;

    const banner = document.getElementById("conflict-banner");
    if (conflicts.size > 0) {
      banner.innerHTML = `
        <div class="drug-warning" style="margin-top:1rem;">
          <i data-lucide="alert-triangle" class="i-6"></i>
          <div>
            <h4>Double-booking detected</h4>
            <p>${conflicts.size} slot${conflicts.size !== 1 ? 's' : ''} conflict in the schedule. Reassign or shift times to resolve.</p>
          </div>
        </div>
      `;
    } else {
      banner.innerHTML = "";
    }

    // Modal room dropdown
    const sel = document.getElementById("bk-room");
    if (sel) sel.innerHTML = rooms.map((r) => `<option value="${r.id}">${r.name}</option>`).join("");

    if (window.renderIcons) window.renderIcons();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderGrid();

    function checkBookConflict() {
      const room = document.getElementById("bk-room").value;
      const start = document.getElementById("bk-start").value;
      const end = document.getElementById("bk-end").value;
      const tentative = { start, end, roomId: room, id: "tentative" };
      const slots = window.VetData.getSurgerySlots();
      const conflict = slots.some((s) => s.roomId === room && overlap(s, tentative));
      const warn = document.getElementById("bk-warning");
      if (conflict) {
        warn.innerHTML = `<div class="drug-warning"><i data-lucide="alert-triangle" class="i-5"></i><div><h4>Conflict in this room</h4><p>This OR is already booked during the selected window.</p></div></div>`;
      } else {
        warn.innerHTML = "";
      }
      if (window.renderIcons) window.renderIcons();
    }
    ["bk-room", "bk-start", "bk-end"].forEach((id) => document.getElementById(id).addEventListener("change", checkBookConflict));

    document.getElementById("bk-save").addEventListener("click", () => {
      const patient = document.getElementById("bk-patient").value.trim();
      const proc = document.getElementById("bk-proc").value.trim();
      if (!patient || !proc) { window.showToast("Missing details", "Patient name and procedure required."); return; }
      window.VetData.addSurgerySlot({
        id: "ss" + Date.now(),
        roomId: document.getElementById("bk-room").value,
        date: "today",
        start: document.getElementById("bk-start").value,
        end: document.getElementById("bk-end").value,
        patient: patient,
        procedure: proc,
        surgeon: document.getElementById("bk-surgeon").value,
      });
      window.closeModal("book-modal");
      window.showToast("Slot booked", `${proc} for ${patient}`);
      renderGrid();
    });
  });
})();
