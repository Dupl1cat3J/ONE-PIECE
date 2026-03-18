document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  
  if (hamburger) {
      hamburger.addEventListener("click", () => {
          hamburger.classList.toggle("active");
          navMenu.classList.toggle("active");
      });
  }

  // Header Scroll Effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
          header.classList.add("scrolled");
      } else {
          header.classList.remove("scrolled");
      }
  });

  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
          }
      });
  }, fadeOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));
});

// Windows Load event for Loader and Popup
window.addEventListener("load", () => {
  const loaderWrapper = document.querySelector(".loader-wrapper");
  const initialPopup = document.querySelector(".initial-popup");

  // Keep loader for 2.5 seconds to allow ship animation to run
  setTimeout(() => {
      if (loaderWrapper) {
          loaderWrapper.classList.add("hidden");
      }
      
      // After loader fades out (0.5s transition), show popup
      setTimeout(() => {
          if (loaderWrapper) {
              loaderWrapper.style.display = 'none';
          }
          if (initialPopup) {
              initialPopup.classList.add("show");
              
              // Keep popup for 2 seconds then hide
              setTimeout(() => {
                  initialPopup.classList.remove("show");
                  setTimeout(() => {
                      initialPopup.style.display = "none";
                  }, 1000); // Wait for transition
              }, 2000);
          }
      }, 500);
  }, 2500);
});
