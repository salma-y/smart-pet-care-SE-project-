/* ============================================================
   PetWell — Shell (TopNav, Sidebar, Footer, Toast, Modal helpers)
   Injected on every page after data.js has loaded.
   ============================================================ */

(function () {
  const pageInfo = window.PetWellPage || {}; // each page sets this before loading shell.js
  const isAuth = ["login", "register", "forgot-password"].includes(pageInfo.id);
  const isLanding = pageInfo.id === "home";
  const showSidebar = ["dashboard", "pets", "pet-detail", "symptom-checker", "appointments", "appointments-new", "lost-pets"].includes(pageInfo.id);

  // ---------- TopNav ----------
  function renderTopNav() {
    if (isAuth) return "";
    const links = [
      { name: "Pet Owner", path: "dashboard.html", active: ["dashboard", "pets", "pet-detail"].includes(pageInfo.id) },
      { name: "Veterinarian", path: "coming-soon.html" },
      { name: "Service Provider", path: "coming-soon.html" },
      { name: "Marketplace", path: "coming-soon.html" },
      { name: "Admin", path: "coming-soon.html" },
    ];

    return `
      <header class="topnav">
        <div class="topnav-inner">
          <div class="flex items-center gap-6">
            <a href="index.html" class="brand">
              <div class="brand-logo">PW</div>
              <span class="brand-name">PetWell</span>
            </a>
            <nav class="nav-links">
              ${links.map((l) => `
                <a href="${l.path}" class="${l.active ? "active" : ""}">${l.name}</a>
              `).join("")}
            </nav>
          </div>

          <div class="flex items-center gap-2">
            <button class="icon-btn md:flex hidden" aria-label="Search">
              <i data-lucide="search" class="i-5"></i>
            </button>
            <button class="icon-btn relative" aria-label="Notifications">
              <i data-lucide="bell" class="i-5"></i>
              <span class="notif-dot"></span>
            </button>
            <div class="dropdown" id="user-dropdown">
              <button class="avatar-btn" data-dropdown-toggle="user-dropdown" aria-label="Open user menu">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Jane Doe">
              </button>
              <div class="dropdown-menu">
                <div class="dropdown-label">
                  <p class="text-sm font-medium">Jane Doe</p>
                  <p class="text-xs text-muted-foreground">jane.doe@example.com</p>
                </div>
                <div class="dropdown-separator"></div>
                <a href="coming-soon.html" class="dropdown-item">Profile</a>
                <a href="coming-soon.html" class="dropdown-item">Settings</a>
                <div class="dropdown-separator"></div>
                <a href="login.html" class="dropdown-item">Log out</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  // ---------- Sidebar ----------
  function renderSidebar() {
    if (!showSidebar) return "";
    const items = [
      { name: "Dashboard", href: "dashboard.html", icon: "layout-dashboard", id: "dashboard" },
      { name: "My Pets", href: "pets.html", icon: "paw-print", id: "pets" },
      { name: "Symptom Checker", href: "symptom-checker.html", icon: "stethoscope", id: "symptom-checker" },
      { name: "Appointments", href: "appointments.html", icon: "calendar-days", id: "appointments" },
      { name: "Lost Pet Alerts", href: "lost-pets.html", icon: "triangle-alert", id: "lost-pets" },
    ];
    const isActive = (id) => {
      if (id === "pets" && (pageInfo.id === "pets" || pageInfo.id === "pet-detail")) return true;
      if (id === "appointments" && (pageInfo.id === "appointments" || pageInfo.id === "appointments-new")) return true;
      return pageInfo.id === id;
    };
    return `
      <aside class="sidebar">
        <nav>
          ${items.map((item) => `
            <a href="${item.href}" class="sidebar-link ${isActive(item.id) ? "active" : ""}">
              <i data-lucide="${item.icon}" class="i-4"></i>
              <span>${item.name}</span>
            </a>
          `).join("")}
        </nav>
        <div class="sidebar-help">
          <div class="sidebar-help-icon">
            <i data-lucide="paw-print" class="i-5"></i>
          </div>
          <h4>Need help?</h4>
          <p>Our veterinary support team is available 24/7.</p>
          <a href="symptom-checker.html" class="btn btn-primary btn-sm w-full" style="display:flex">Start Triage</a>
        </div>
      </aside>
    `;
  }

  // ---------- Footer ----------
  function renderFooter() {
    if (isAuth) return "";
    const year = new Date().getFullYear();
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a href="index.html" class="brand mb-4" style="margin-bottom:1rem;display:inline-flex;">
                <div class="brand-logo">PW</div>
                <span class="brand-name">PetWell</span>
              </a>
              <p class="text-muted-foreground text-sm" style="margin-top: 1rem;">
                The warm, trustworthy hub where pet owners manage everything about their animals.
              </p>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li><a href="dashboard.html">Pet Owners</a></li>
                <li><a href="coming-soon.html">Veterinarians</a></li>
                <li><a href="coming-soon.html">Service Providers</a></li>
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul>
                <li><a href="coming-soon.html">Help Center</a></li>
                <li><a href="coming-soon.html">Contact Us</a></li>
                <li><a href="coming-soon.html">Emergency</a></li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li><a href="coming-soon.html">Privacy Policy</a></li>
                <li><a href="coming-soon.html">Terms of Service</a></li>
                <li><a href="coming-soon.html">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">&copy; ${year} PetWell. All rights reserved.</div>
        </div>
      </footer>
    `;
  }

  // ---------- Mount ----------
  function mount() {
    const slotTop = document.getElementById("topnav-slot");
    const slotSide = document.getElementById("sidebar-slot");
    const slotFooter = document.getElementById("footer-slot");
    if (slotTop) slotTop.outerHTML = renderTopNav();
    if (slotSide) slotSide.outerHTML = renderSidebar();
    if (slotFooter) slotFooter.outerHTML = renderFooter();

    // Bind dropdown toggle
    document.querySelectorAll("[data-dropdown-toggle]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-dropdown-toggle");
        const dropdown = document.getElementById(id);
        document.querySelectorAll(".dropdown.open").forEach((d) => {
          if (d !== dropdown) d.classList.remove("open");
        });
        dropdown.classList.toggle("open");
      });
    });
    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
    });

    // Render lucide icons (lib loaded via CDN in each HTML page)
    if (window.lucide) window.lucide.createIcons();
  }

  // expose helper to re-render icons after dynamic content
  window.renderIcons = function () {
    if (window.lucide) window.lucide.createIcons();
  };

  // ---------- Toast ----------
  window.showToast = function (title, description) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `<h5>${title}</h5>${description ? `<p>${description}</p>` : ""}`;
    container.appendChild(t);
    setTimeout(() => {
      t.style.transition = "opacity 0.3s, transform 0.3s";
      t.style.opacity = "0";
      t.style.transform = "translateX(120%)";
      setTimeout(() => t.remove(), 300);
    }, 3000);
  };

  // ---------- Modal helpers ----------
  window.openModal = function (id) {
    const m = document.getElementById(id);
    if (m) m.classList.add("open");
  };
  window.closeModal = function (id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove("open");
  };

  // bind close buttons / backdrop click
  document.addEventListener("click", function (e) {
    if (e.target.matches("[data-modal-close]")) {
      const m = e.target.closest(".modal-backdrop");
      if (m) m.classList.remove("open");
    }
    if (e.target.classList && e.target.classList.contains("modal-backdrop")) {
      e.target.classList.remove("open");
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
