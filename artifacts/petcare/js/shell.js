/* ============================================================
   PetWell — Shell (TopNav, Sidebar, Footer, Toast, Modal helpers)
   Injected on every page after data.js has loaded.
   ============================================================ */

(function () {
  const pageInfo = window.PetWellPage || {}; // each page sets this before loading shell.js
  const isAuth = ["login", "register", "forgot-password"].includes(pageInfo.id);
  const isLanding = pageInfo.id === "home";

  const ownerPages = ["dashboard", "pets", "pet-detail", "symptom-checker", "appointments", "appointments-new", "lost-pets"];
  const vetPages = ["vet-dashboard", "vet-patients", "vet-consultation", "vet-prescription", "vet-lab-upload", "vet-referral", "vet-surgery", "vet-income"];
  const marketplacePages = ["marketplace", "marketplace-product", "cart", "subscriptions", "loyalty", "recalls"];

  const isOwner = ownerPages.includes(pageInfo.id);
  const isVet = vetPages.includes(pageInfo.id);
  const isMarketplace = marketplacePages.includes(pageInfo.id);
  const showSidebar = isOwner || isVet || isMarketplace;

  // ---------- TopNav ----------
  function renderTopNav() {
    if (isAuth) return "";
    const links = [
      { name: "Pet Owner", path: "dashboard.html", active: isOwner },
      { name: "Veterinarian", path: "vet-dashboard.html", active: isVet },
      { name: "Service Provider", path: "coming-soon.html" },
      { name: "Marketplace", path: "marketplace.html", active: isMarketplace },
      { name: "Admin", path: "coming-soon.html" },
    ];

    const cartCount = (window.VetData ? window.VetData.getCart() : []).reduce((a, b) => a + b.quantity, 0);

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
            <a href="cart.html" class="icon-btn relative" aria-label="Cart">
              <i data-lucide="shopping-cart" class="i-5"></i>
              ${cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : ""}
            </a>
            <button class="icon-btn relative" aria-label="Notifications">
              <i data-lucide="bell" class="i-5"></i>
              <span class="notif-dot"></span>
            </button>
            <div class="dropdown" id="user-dropdown">
              <button class="avatar-btn" data-dropdown-toggle="user-dropdown" aria-label="Open user menu">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User">
              </button>
              <div class="dropdown-menu">
                <div class="dropdown-label">
                  <p class="text-sm font-medium">${isVet ? "Dr. Sarah Jenkins" : "Jane Doe"}</p>
                  <p class="text-xs text-muted-foreground">${isVet ? "sarah.jenkins@petwell.vet" : "jane.doe@example.com"}</p>
                </div>
                <div class="dropdown-separator"></div>
                <a href="coming-soon.html" class="dropdown-item">Profile</a>
                <a href="coming-soon.html" class="dropdown-item">Settings</a>
                <a href="loyalty.html" class="dropdown-item">Loyalty Points</a>
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

    let items = [], helpTitle = "Need help?", helpText = "Our veterinary support team is available 24/7.", helpHref = "symptom-checker.html", helpCta = "Start Triage";

    if (isVet) {
      items = [
        { name: "Vet Dashboard", href: "vet-dashboard.html", icon: "layout-dashboard", id: "vet-dashboard" },
        { name: "Patients", href: "vet-patients.html", icon: "users", id: "vet-patients" },
        { name: "Consultation", href: "vet-consultation.html", icon: "clipboard-pen", id: "vet-consultation" },
        { name: "Prescriptions", href: "vet-prescription.html", icon: "pill", id: "vet-prescription" },
        { name: "Lab Results", href: "vet-lab-upload.html", icon: "flask-conical", id: "vet-lab-upload" },
        { name: "Referrals", href: "vet-referral.html", icon: "share-2", id: "vet-referral" },
        { name: "Surgery", href: "vet-surgery.html", icon: "syringe", id: "vet-surgery" },
        { name: "Income & Schedule", href: "vet-income.html", icon: "trending-up", id: "vet-income" },
      ];
      helpTitle = "Need a consult?";
      helpText = "Connect with a specialist for a second opinion.";
      helpHref = "vet-referral.html";
      helpCta = "Send Referral";
    } else if (isMarketplace) {
      items = [
        { name: "Browse", href: "marketplace.html", icon: "store", id: "marketplace" },
        { name: "Cart", href: "cart.html", icon: "shopping-cart", id: "cart" },
        { name: "Subscriptions", href: "subscriptions.html", icon: "repeat", id: "subscriptions" },
        { name: "Loyalty Points", href: "loyalty.html", icon: "award", id: "loyalty" },
        { name: "Recalls", href: "recalls.html", icon: "alert-triangle", id: "recalls" },
      ];
      helpTitle = "Vet recommended";
      helpText = "Filter products endorsed by your pet's veterinarian.";
      helpHref = "marketplace.html?vetRec=1";
      helpCta = "View Picks";
    } else {
      items = [
        { name: "Dashboard", href: "dashboard.html", icon: "layout-dashboard", id: "dashboard" },
        { name: "My Pets", href: "pets.html", icon: "paw-print", id: "pets" },
        { name: "Symptom Checker", href: "symptom-checker.html", icon: "stethoscope", id: "symptom-checker" },
        { name: "Appointments", href: "appointments.html", icon: "calendar-days", id: "appointments" },
        { name: "Lost Pet Alerts", href: "lost-pets.html", icon: "triangle-alert", id: "lost-pets" },
      ];
    }

    const isActive = (id) => {
      if (id === "pets" && (pageInfo.id === "pets" || pageInfo.id === "pet-detail")) return true;
      if (id === "appointments" && (pageInfo.id === "appointments" || pageInfo.id === "appointments-new")) return true;
      if (id === "marketplace" && (pageInfo.id === "marketplace" || pageInfo.id === "marketplace-product")) return true;
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
          <h4>${helpTitle}</h4>
          <p>${helpText}</p>
          <a href="${helpHref}" class="btn btn-primary btn-sm w-full" style="display:flex">${helpCta}</a>
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
                <li><a href="vet-dashboard.html">Veterinarians</a></li>
                <li><a href="marketplace.html">Marketplace</a></li>
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
