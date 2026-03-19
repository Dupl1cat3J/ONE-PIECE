document.addEventListener("DOMContentLoaded", () => {

  //Mobile Menu Toggle // Toggle ก็เหมือนการใช้ if, else 
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  //เมื่อคลิก link(เมนูที่ link ไปหน้าอื่น) ใน nav ให้ปิดเมนูทันที โดยใช้คำสั่ง remove
  document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }));

  //Header Scroll Effect //header เปลี่ยนสไตล์เมื่อมีการ scroll เกิน 50px
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  //Fade-in on Scroll // การใช้ IntersectionObserver จะเช็คว่า element อยู่ใน viewport แล้วยัง และดีกว่าใช้ scroll event เพราะมันไม่กิน perform ของงาน //observer.unobserve(entry.target) จะ fade in แค่ครั้งเดียว
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

  //Gallery Slider //getElementById จะหา element ด้วย ID และคำสั่ง if จะเช็คว่ามี element ครบมั้ยเพื่อป้องกัน error ในหน้าที่ไม่มี gallery และสั่ง scroll เลื่อนไปทางขวา 280px เพื่อดูรูปถัดไป ซึ่งมีคำสั่ง -280 เพื่อเลื่อนกลับได้
  const track = document.getElementById("galleryTrack");
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");
  if (track && prevBtn && nextBtn) {
    const scrollAmount = 280;
    prevBtn.addEventListener("click", () => track.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
    nextBtn.addEventListener("click", () => track.scrollBy({ left: scrollAmount, behavior: "smooth" }));
  }

  // --Grand Line Page-- // 
  const crewData = {
    luffy: {
      name: "Monkey D. Luffy", role: "Captain",
      bounty: "฿ 3,000,000,000", fruit: "Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)",
      origin: "Foosha Village, East Blue",
      bio: "The founder and captain of the Straw Hat Pirates. His dream is to find the One Piece and become King of the Pirates.",
      quote: '"I\'m going to be King of the Pirates!"',
      img: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=800"
    },
    zoro: {
      name: "Roronoa Zoro", role: "Swordsman",
      bounty: "฿ 1,111,000,000", fruit: "None",
      origin: "Shimotsuki Village, East Blue",
      bio: "A master swordsman who aims to become the world's greatest. He uses the three-sword style — Santoryu.",
      quote: '"Nothing happened."',
      img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800"
    },
    nami: {
      name: "Nami", role: "Navigator",
      bounty: "฿ 366,000,000", fruit: "None",
      origin: "Cocoyasi Village, East Blue",
      bio: "The navigator of the Straw Hats. She can read weather patterns perfectly and wields the Clima-Tact.",
      quote: '"Steal from pirates and give to me."',
      img: "https://images.unsplash.com/photo-1560961814-1e095a51fb3e?q=80&w=800"
    },
    usopp: {
      name: "Usopp", role: "Sniper",
      bounty: "฿ 500,000,000", fruit: "None",
      origin: "Syrup Village, East Blue",
      bio: "The sharpshooter of the crew. He is a gifted inventor and storyteller who strives to be a brave warrior of the sea.",
      quote: '"I am the great warrior, Sogeking!"',
      img: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800"
    },
    sanji: {
      name: "Sanji", role: "Cook",
      bounty: "฿ 1,032,000,000", fruit: "None",
      origin: "Baratie, East Blue",
      bio: "The cook of the Straw Hats. He only fights with his legs and dreams of finding the All Blue — a legendary sea with every fish in existence.",
      quote: '"I\'ll never use my hands in a fight."',
      img: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800"
    },
    chopper: {
      name: "Tony Tony Chopper", role: "Doctor",
      bounty: "฿ 1,000", fruit: "Hito Hito no Mi",
      origin: "Drum Island, Grand Line",
      bio: "A reindeer who ate the Human-Human Fruit. He can transform into various forms and dreams of becoming a doctor who can cure any disease.",
      quote: '"I\'m not a tanuki!"',
      img: "https://images.unsplash.com/photo-1596727147705-611529ea2884?q=80&w=800"
    },
  };

  //card.dataset.crew จะอ่านค่าจาก data-crew="luffy" ใน HTML และ crewData[key] จะเป็นตัวดึง object ของตัวละครนั้นมา และจะใช้ textContent เพื่อเปลี่ยนข้อความใน element

  const charCards = document.querySelectorAll(".char-card");
  const detailPanel = document.getElementById("charDetailPanel");

  if (charCards.length && detailPanel) {
    charCards.forEach(card => {
      card.addEventListener("click", () => {
        const key = card.dataset.crew;
        const data = crewData[key];
        if (!data) return;

        charCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        document.getElementById("detailName").textContent = data.name;
        document.getElementById("detailRole").textContent = data.role;
        document.getElementById("detailBounty").textContent = data.bounty;
        document.getElementById("detailFruit").textContent = data.fruit;
        document.getElementById("detailOrigin").textContent = data.origin;
        document.getElementById("detailBio").textContent = data.bio;
        document.getElementById("detailQuote").textContent = data.quote;
        document.getElementById("detailImg").src = data.img;

        detailPanel.classList.add("active");

        // scroll to panel on mobile
        if (window.innerWidth < 768) {
          detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Close button
    const closeBtn = document.getElementById("closeDetail");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        detailPanel.classList.remove("active");
        charCards.forEach(c => c.classList.remove("active"));
      });
    }
  }

  // ── Loader & Popup Sequence ──────────────────────────────────────────────
  // ใช้ sessionStorage → loader ขึ้นแค่ครั้งแรกต่อ session
  // พอเปลี่ยนหน้าในเว็บ (Home → Grand Line) จะไม่ขึ้นอีก
  // จะขึ้นใหม่เมื่อ: เปิด tab ใหม่ หรือ refresh
  const hasLoaded = sessionStorage.getItem("hasLoaded");

  if (!hasLoaded) {
    // ครั้งแรก — รัน loader ตามปกติ
    sessionStorage.setItem("hasLoaded", "true");
    runLoaderSequence();
  } else {
    // กลับมาจากหน้าอื่น — ซ่อน loader ทันที
    const loaderWrapper = document.querySelector(".loader-wrapper");
    const initialPopup = document.querySelector(".initial-popup");
    if (loaderWrapper) loaderWrapper.style.display = "none";
    if (initialPopup) initialPopup.style.display = "none";

    // play video ทันที
    document.querySelectorAll("video").forEach(v => {
      v.preload = "auto";
      v.play().catch(() => { });
    });
  }

  function runLoaderSequence() {
    const loaderWrapper = document.querySelector(".loader-wrapper");
    const initialPopup = document.querySelector(".initial-popup");

    document.querySelectorAll("video").forEach(v => { v.preload = "none"; });

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
                v.play().catch(() => { });
              });
            }, 1000);
          }, 2000);
        }
      }, 500);
    }, 2500);
  }

}); 

//Wrapper hidden ซ่อน Loader
//Popup show แสดง popup luffy