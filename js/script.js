const hamburger = document.querySelector(".hamburger");
const menuWrapper = document.querySelector(".menu-wrapper");
const header = document.querySelector("header");

/* MENU MOBILE */
hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    menuWrapper.classList.toggle("active");
});

/* ========== FIX DROPDOWN MOBILE ========== */
const dropdowns = document.querySelectorAll(".dropdown");

function isMobile() {
    return window.innerWidth <= 768;
}

dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector("a:first-child");
    
    if (dropdownLink) {
        dropdownLink.addEventListener("click", function(e) {
            if (isMobile()) {
                e.preventDefault();
                e.stopPropagation();
                
                dropdowns.forEach(d => {
                    if (d !== dropdown && d.classList.contains("active")) {
                        d.classList.remove("active");
                    }
                });
                
                dropdown.classList.toggle("active");
            }
        });
    }
});

/* TUTUP MENU SAAT LINK DIKLIK */
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", (e) => {
        const parentDropdown = link.closest(".dropdown");
        
        if (parentDropdown && isMobile()) {
            return;
        }
        
        if (!parentDropdown || !isMobile()) {
            menuWrapper.classList.remove("active");
        }
    });
});

/* TUTUP MENU KALO KLIK DI LUAR (mobile) */
document.addEventListener("click", function(e) {
    if (isMobile() && menuWrapper.classList.contains("active")) {
        if (!menuWrapper.contains(e.target) && !hamburger.contains(e.target)) {
            menuWrapper.classList.remove("active");
            dropdowns.forEach(d => {
                d.classList.remove("active");
            });
        }
    }
});

/* RESET MENU SAAT DESKTOP */
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        menuWrapper.classList.remove("active");
        dropdowns.forEach(d => {
            d.classList.remove("active");
        });
    }
});

/* SHADOW HEADER */
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 15px rgba(0,0,0,.15)";
    } else {
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,.08)";
    }
});

/* ACCORDION VISI MISI */
const accordionBtns = document.querySelectorAll(".accordion-btn");

accordionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        accordionBtns.forEach(other => {
            if (other !== btn && other.classList.contains("active")) {
                other.classList.remove("active");
                other.nextElementSibling.classList.remove("active");
            }
        });
        
        btn.classList.toggle("active");
        const content = btn.nextElementSibling;
        content.classList.toggle("active");
    });
});

/* INFINITE HERO SLIDER */
const slider = document.querySelector(".hero-image");

if (slider) {
    const slides = slider.querySelectorAll("img");
    
    if (slides.length > 0) {
        const firstClone = slides[0].cloneNode(true);
        slider.appendChild(firstClone);
        
        let current = 0;
        
        setInterval(() => {
            current++;
            const slideWidth = slides[0].offsetWidth + 25;
            
            slider.scrollTo({
                left: current * slideWidth,
                behavior: "smooth"
            });
            
            if (current === slides.length) {
                setTimeout(() => {
                    slider.scrollTo({
                        left: 0,
                        behavior: "auto"
                    });
                    current = 0;
                }, 600);
            }
        }, 1800);
    }
}

/* ========== COUNTER STATISTIK - BERGERAK TERUS (LOOPING) ========== */
const counters = document.querySelectorAll(".counter");

// Fungsi untuk menjalankan animasi counter
function startCounter(counter) {
    const target = +counter.dataset.target;
    let current = 0;
    
    const interval = setInterval(() => {
        current += Math.ceil(target / 50);
        
        if (current >= target) {
            if (target === 300 || target === 750) {
                counter.innerText = target + "+";
            } else {
                counter.innerText = target;
            }
            clearInterval(interval);
        } else {
            if (target === 300 || target === 750) {
                counter.innerText = current + "+";
            } else {
                counter.innerText = current;
            }
        }
    }, 30);
}

// Fungsi untuk mereset counter ke 0
function resetCounter(counter) {
    const target = +counter.dataset.target;
    if (target === 300 || target === 750) {
        counter.innerText = "0+";
    } else {
        counter.innerText = "0";
    }
}

// Observer untuk mendeteksi section statistik
const statistikSection = document.querySelector(".statistik");
let isAnimating = false;
let animationInterval = null;

if (statistikSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isAnimating) {
            isAnimating = true;
            
            // Jalankan semua counter
            counters.forEach(counter => {
                resetCounter(counter);
                startCounter(counter);
            });
            
            // Set timeout untuk reset dan ulang lagi setelah selesai
            setTimeout(() => {
                isAnimating = false;
                // Looping: reset dan jalankan lagi
                if (animationInterval) clearInterval(animationInterval);
                animationInterval = setInterval(() => {
                    if (!isAnimating && statistikSection && isElementInViewport(statistikSection)) {
                        isAnimating = true;
                        counters.forEach(counter => {
                            resetCounter(counter);
                            startCounter(counter);
                        });
                        setTimeout(() => {
                            isAnimating = false;
                        }, 3000);
                    }
                }, 5000);
            }, 3000);
        }
    }, { threshold: 0.3 });
    
    observer.observe(statistikSection);
}

// Helper function untuk cek apakah elemen di viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* LUCIDE ICON */
if (typeof lucide !== "undefined") {
    lucide.createIcons();
}