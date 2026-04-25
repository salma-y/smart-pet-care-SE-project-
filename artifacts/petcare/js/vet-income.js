(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const stats = window.VetData.getMonthlyStats();
    const max = Math.max(...stats.map((s) => s.count));
    document.getElementById("bar-chart").innerHTML = stats.map((s) => {
      const pct = (s.count / max) * 100;
      return `
        <div class="bar-col">
          <span class="bar-value">${s.count}</span>
          <div class="bar-fill" style="height:${pct}%;"></div>
          <span class="bar-label">${s.month}</span>
        </div>
      `;
    }).join("");

    const upcoming = [
      { day: "Today", time: "13:30", patient: "Whiskers", type: "Surgery — Dental", room: "OR 1" },
      { day: "Today", time: "15:30", patient: "Rocky", type: "Vaccinations", room: "Exam 2" },
      { day: "Tomorrow", time: "09:00", patient: "Bella", type: "Wellness Exam", room: "Exam 1" },
      { day: "Tomorrow", time: "11:15", patient: "Max", type: "Joint Recheck", room: "Exam 3" },
      { day: "Wed, Apr 26", time: "08:30", patient: "Mochi", type: "Allergy Recheck", room: "Exam 1" },
      { day: "Wed, Apr 26", time: "14:00", patient: "Charlie", type: "Glucose Curve", room: "Exam 2" },
      { day: "Thu, Apr 27", time: "10:00", patient: "Luna", type: "Spay", room: "OR 2" },
      { day: "Fri, Apr 28", time: "09:30", patient: "Pickle", type: "Lab Review", room: "Exam 1" },
    ];

    document.getElementById("upcoming-body").innerHTML = upcoming.map((u) => `
      <tr>
        <td><strong>${u.day}</strong></td>
        <td>${u.time}</td>
        <td>${u.patient}</td>
        <td>${u.type}</td>
        <td><span class="badge badge-secondary">${u.room}</span></td>
        <td><button class="btn btn-ghost btn-sm"><i data-lucide="chevron-right" class="i-4"></i></button></td>
      </tr>
    `).join("");

    if (window.renderIcons) window.renderIcons();
  });
})();
