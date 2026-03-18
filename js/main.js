document.addEventListener("DOMContentLoaded", () => {

  // ── Mobile Menu Toggle ───────────────────────────────────────────────────
  const hamburger = document.querySelector(".hamburger");
  const navMenu   = document.querySelector(".nav-menu");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // ── Header Scroll Effect ─────────────────────────────────────────────────
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // ── Fade-in on Scroll (Intersection Observer) ────────────────────────────
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: "0px", threshold: 0.15 });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ── Gallery Slider ───────────────────────────────────────────────────────
  const track   = document.getElementById("galleryTrack");
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");

  if (track && prevBtn && nextBtn) {
    const scrollAmount = 280;
    prevBtn.addEventListener("click", () => track.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
    nextBtn.addEventListener("click", () => track.scrollBy({ left:  scrollAmount, behavior: "smooth" }));
  }

  // ── Crew Page: Anchor Point → Glass Panel ────────────────────────────────
  const crewData = {
    luffy:   { name: "Monkey D. Luffy",   role: "Captain",   quote: '"I\'m going to be King of the Pirates!"', bounty: "฿ 3,000,000,000",   fruit: "Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)", poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=800" },
    zoro:    { name: "Roronoa Zoro",      role: "Swordsman", quote: '"Nothing happened."',                      bounty: "฿ 1,111,000,000",   fruit: "None",                                          poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=800" },
    nami:    { name: "Nami",              role: "Navigator", quote: '"Steal from pirates and give to me."',     bounty: "฿ 366,000,000",     fruit: "None",                                          poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=800" },
    usopp:   { name: "Usopp",            role: "Sniper",    quote: '"I am the great warrior, Sogeking!"',      bounty: "฿ 500,000,000",     fruit: "None",                                          poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=800" },
    sanji:   { name: "Sanji",            role: "Cook",      quote: '"I\'ll never use my hands in a fight."',  bounty: "฿ 1,032,000,000",   fruit: "None",                                          poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=800" },
    chopper: { name: "Tony Tony Chopper", role: "Doctor",   quote: '"I\'m not a tanuki!"',                    bounty: "฿ 1,000",           fruit: "Hito Hito no Mi",                               poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=800" },
  };

  const anchorPoints = document.querySelectorAll(".anchor-point");
  const glassPanel   = document.getElementById("crewDetailPanel");

  if (anchorPoints.length && glassPanel) {
    anchorPoints.forEach(point => {
      point.addEventListener("click", () => {
        const key  = point.dataset.crew;
        const data = crewData[key];
        if (!data) return;

        anchorPoints.forEach(p => p.classList.remove("active"));
        point.classList.add("active");

        document.getElementById("crewName").textContent   = data.name;
        document.getElementById("crewRole").textContent   = data.role;
        document.getElementById("crewQuote").textContent  = data.quote;
        document.getElementById("crewBounty").textContent = data.bounty;
        document.getElementById("crewFruit").textContent  = data.fruit;
        document.getElementById("crewPoster").src         = data.poster;

        glassPanel.classList.add("active");
      });
    });
  }

  // ── Loader & Popup Sequence ──────────────────────────────────────────────
  runLoaderSequence();

  function runLoaderSequence() {
    const loaderWrapper = document.querySelector(".loader-wrapper");
    const initialPopup  = document.querySelector(".initial-popup");

    document.querySelectorAll("video").forEach(v => {
      v.preload = "none";
    });

    setTimeout(() => {
      if (loaderWrapper) loaderWrapper.classList.add("hidden");

      setTimeout(() => {
        if (loaderWrapper) loaderWrapper.style.display = "none";

        if (initialPopup) {
          initialPopup.classList.add("show");

          setTimeout(() => {
            initialPopup.classList.remove("show");

            setTimeout(() => {
              initialPopup.style.display = "none";

              document.querySelectorAll("video").forEach(v => {
                v.preload = "auto";
                v.play().catch(() => {});
              });

            }, 1000);
          }, 2000);
        }
      }, 500);
    }, 2500);
  }

}); // ← ปิด DOMContentLoaded ตรงนี้ จบแค่นี้