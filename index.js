
$(document).ready(function() {
    // Mobile Menu Toggle
    $(".mobile-menu-btn").click(function() {
        $(".nav-links").toggleClass("active");
        $(this).find("i").toggleClass("fa-bars fa-times");
    });

    // Smooth Scrolling for Anchor Links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
        // Close mobile menu if open
        $(".nav-links").removeClass("active");
        $(".mobile-menu-btn i").removeClass("fa-times").addClass("fa-bars");
    });

    // Header Scroll Effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $("#header").addClass("scrolled");
        } else {
            $("#header").removeClass("scrolled");
        }
        
        // Fade-in animation for elements when scrolled into view
        $('.fade-in').each(function() {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (elementPos < topOfWindow + windowHeight - 100) {
                $(this).addClass('visible');
            }
        });
    });

    // Trigger initial fade-in for elements in view
    $(window).trigger('scroll');

    // Product Filter
    $(".filter-btn").click(function() {
        var filter = $(this).data("filter");
        
        // Update active button
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");
        
        // Filter products
        if (filter === "all") {
            $(".product-card").show();
        } else {
            $(".product-card").hide();
            $(".product-card[data-category='" + filter + "']").show();
        }
    });

    // Carrusel 3d de productos
    const grid = document.getElementById('products-grid');
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');
  const cards = document.querySelectorAll('.product-card');

  const scrollAmount = 300; // píxeles que se moverá cada vez

  leftArrow.addEventListener('click', () => {
    grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  grid.addEventListener('scroll', () => {
    const gridCenter = grid.scrollLeft + grid.clientWidth / 2;

    cards.forEach(card => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = gridCenter - cardCenter;
      const rotate = distance / 20;

      card.style.transform = `rotateY(${rotate}deg)`;
    });
  });

    // Testimonial Carousel
    let currentSlide = 0;
    const slides = $(".testimonial-slide");
    const maxSlides = slides.length;
    
    // Hide all slides except first
    slides.hide();
    slides.eq(currentSlide).show();
    
    // Next slide
    $(".carousel-next").click(function() {
        slides.eq(currentSlide).hide();
        currentSlide = (currentSlide + 1) % maxSlides;
        slides.eq(currentSlide).show();
    });
    
    // Previous slide
    $(".carousel-prev").click(function() {
        slides.eq(currentSlide).hide();
        currentSlide = (currentSlide - 1 + maxSlides) % maxSlides;
        slides.eq(currentSlide).show();
    });
    
    // Auto advance slides every 5 seconds
    let slideInterval = setInterval(function() {
        $(".carousel-next").click();
    }, 5000);
    
    // Pause carousel on hover
    $(".testimonials-carousel").hover(
        function() {
            clearInterval(slideInterval);
        },
        function() {
            slideInterval = setInterval(function() {
                $(".carousel-next").click();
            }, 5000);
        }
    );

    // FAQ Accordion
    $(".faq-question").click(function() {
        // Toggle current FAQ item
        $(this).toggleClass("active");
        $(this).next(".faq-answer").toggleClass("active");
        
        // Close other FAQ items
        $(".faq-question").not(this).removeClass("active");
        $(".faq-answer").not($(this).next()).removeClass("active");
    });

    // Form Submission (Prototype)
    $(".contact-form").submit(function(e) {
        e.preventDefault();
        
        // Simple validation
        let valid = true;
        $(this).find("[required]").each(function() {
            if (!$(this).val()) {
                valid = false;
                $(this).addClass("is-invalid");
            } else {
                $(this).removeClass("is-invalid");
            }
        });
        
        if (valid) {
            // Simulate form submission
            let submitBtn = $(this).find(".form-submit");
            let originalText = submitBtn.text();
            
            submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Enviando...').prop("disabled", true);
            
            // Simulate API call
            setTimeout(function() {
                $(".contact-form")[0].reset();
                submitBtn.html('<i class="fas fa-check"></i> ¡Mensaje Enviado!');
                
                setTimeout(function() {
                    submitBtn.text(originalText).prop("disabled", false);
                }, 3000);
            }, 2000);
        }
    });

    // CSV URL
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMvSPsTHrtLGF_Be8n7eRKOAGZxKhanAFsOGUYRUzuCi4lG2fDpb-QjL9tr4FF2yyE6cB8qS8y44SP/pub?gid=0&single=true&output=csv";
    const CATEGORY_MAP = {
      "hojas": "papers",
      "libretas": "notebooks",
      "lapices": "pencils",
      "sets": "sets"
      // add more mappings here as needed
    };

    function parseCSV(text) {
      const lines = text.trim().split("\n");
      const headers = lines.shift().split(",");
      return lines.map(line => {
        const cols = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/); // simple CSV split
        let obj = {};
        headers.forEach((h,i) => obj[h.trim()] = cols[i].replace(/(^"|"$)/g,'').trim());
        return obj;
      });
    }

    function buildProductCard(p) {
      const catKey = CATEGORY_MAP[p.categoria] || p.categoria.toLowerCase();
      return `
        <div class="product-card fade-in" data-category="${catKey}">
          <img src="${p.imagen}" alt="${p.nombre}" class="product-image">
          <div class="product-details">
            <h3 class="product-name">${p.nombre}</h3>
            <p class="product-price">${p.precio}</p>
            <p class="product-description">${p.descripcion}</p>
            <div class="product-actions">
              <a href="${p.whatsapp}"
                    target="_blank"
                    rel="noopener"
                    class="btn btn-whatsapp">
                <i class="fab fa-whatsapp"></i> WhatsApp
              </a>
              <a href="${p.instagram}"
                    target="_blank"
                    rel="noopener"
                    class="btn btn-instagram">
                <i class="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>`;
    }

    function refreshCatalog() {
      $.get(CSV_URL)
       .done(csvText => {
         const data = parseCSV(csvText);
         const $grid = $("#products-grid").empty();
         data.forEach(item => {
           $grid.append(buildProductCard(item));
         });
         // re‐apply filter so that current button stays active
         const active = $(".filter-btn.active").data("filter");
         $(".filter-btn[data-filter='"+active+"']").click();
         // trigger fade-in visibility
         $(window).trigger("scroll");
       })
       .fail(() => {
         console.warn("Error cargando catálogo CSV");
       });
    }

    // initial load
    refreshCatalog();
    // refresh every 5 minutes
    setInterval(refreshCatalog, 5 * 60 * 1000);
});