(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const dayName = today.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
    document.getElementById("today-date").textContent = dayName;

    // Schedule
    const schedule = window.VetData.getTodaySchedule();
    document.getElementById("schedule-list").innerHTML = schedule.map((s) => {
      const cls = s.status === "Completed" ? "completed" : s.status === "In Progress" ? "in-progress" : "upcoming";
      const badge = s.status === "Completed" ? "badge badge-green" : s.status === "In Progress" ? "badge badge-amber" : "badge badge-outline";
      return `
        <div class="schedule-item">
          <div class="schedule-time">${s.time}<small>${s.duration} min</small></div>
          <div class="schedule-bar ${cls}"></div>
          <div class="schedule-info">
            <h4>${s.patientName} <span class="text-muted-foreground" style="font-weight:500;">— ${s.ownerName}</span></h4>
            <p>${s.type} · ${s.room}</p>
          </div>
          <span class="${badge}">${s.status}</span>
        </div>
      `;
    }).join("");

    // Alerts
    const alerts = window.VetData.getPatientAlerts();
    document.getElementById("alerts-list").innerHTML = alerts.map((a) => `
      <div class="alert-row">
        <span class="alert-dot ${a.severity}"></span>
        <div style="flex:1;">
          <div class="flex items-center justify-between gap-2">
            <strong style="font-size:0.875rem;">${a.patientName}</strong>
            <span class="badge ${a.severity === 'high' ? 'badge-red' : a.severity === 'medium' ? 'badge-amber' : 'badge-secondary'}">${a.severity}</span>
          </div>
          <p class="text-sm text-muted-foreground" style="margin-top:0.125rem;">${a.message}</p>
        </div>
      </div>
    `).join("");

    // Surgery rooms
    const rooms = window.VetData.getSurgeryRooms();
    const slots = window.VetData.getSurgerySlots();
    document.getElementById("rooms-strip").innerHTML = rooms.map((r) => {
      const used = slots.filter((s) => s.roomId === r.id).length;
      const status = used === 0 ? { color: "green", text: "Available" } : used >= 2 ? { color: "red", text: "Booked" } : { color: "amber", text: "In Use" };
      return `
        <div class="card p-4" style="border-left: 4px solid ${status.color === 'green' ? '#22c55e' : status.color === 'amber' ? '#f59e0b' : '#ef4444'};">
          <div class="flex items-center justify-between mb-2">
            <strong>${r.name}</strong>
            <span class="badge badge-${status.color === 'green' ? 'green' : status.color === 'amber' ? 'amber' : 'red'}">${status.text}</span>
          </div>
          <p class="text-xs text-muted-foreground">${used} procedure${used !== 1 ? 's' : ''} scheduled today</p>
          <p class="text-xs text-muted-foreground" style="margin-top:0.25rem;">Equipment: ${r.equipment.join(', ')}</p>
        </div>
      `;
    }).join("");

    if (window.renderIcons) window.renderIcons();
  });
})();
