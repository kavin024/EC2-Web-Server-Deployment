/* ============================================================
   KAVIN P — DevOps Portfolio
   Vanilla JavaScript only. No frameworks, no animation libs.
   ============================================================ */

(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  /* ---------- Feature detection / guards ---------- */
  var hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     1. Sticky header + scroll progress + back-to-top
     ============================================================ */
  var header = doc.getElementById("siteHeader");
  var progress = doc.getElementById("scrollProgress");
  var backTop = doc.getElementById("backTop");

  function onScroll() {
    var y = window.scrollY || root.scrollTop;
    if (header) header.classList.toggle("is-scrolled", y > 12);

    if (progress) {
      var max = doc.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (y / max) * 100 : 0;
      progress.style.width = pct + "%";
    }

    if (backTop) {
      backTop.style.opacity = y > 500 ? "1" : "0";
      backTop.style.pointerEvents = y > 500 ? "auto" : "none";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ============================================================
     2. Mobile navigation
     ============================================================ */
  var navToggle = doc.getElementById("navToggle");
  var siteNav = doc.getElementById("siteNav");

  function closeNav() {
    if (!siteNav) return;
    siteNav.classList.remove("is-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.classList.remove("is-active");
    }
    doc.body.classList.remove("nav-open");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = !siteNav.classList.contains("is-open");
      siteNav.classList.toggle("is-open", open);
      navToggle.classList.toggle("is-active", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      doc.body.classList.toggle("nav-open", open);
    });

    // Close menu when a nav link is clicked or the escape key is pressed.
    siteNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });

    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ============================================================
     3. Active nav link (IntersectionObserver)
     ============================================================ */
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (link) {
      return doc.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + id
            );
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ============================================================
     4. Scroll reveal (IntersectionObserver)
     ============================================================ */
  var revealEls = doc.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ============================================================
     5. Terminal typing animation
     ============================================================ */
  var termBody = doc.getElementById("terminalBody");

  var termScript = [
    { prompt: "$ ", cmd: "whoami", out: "kavin", cls: "term-out" },
    { prompt: "$ ", cmd: "role", out: "DevOps Engineer", cls: "term-out-acc" },
    { prompt: "$ ", cmd: "cloud", out: "AWS", cls: "term-out" },
    { prompt: "$ ", cmd: "container", out: "Docker", cls: "term-out-acc" },
    { prompt: "$ ", cmd: "cicd", out: "GitHub Actions", cls: "term-out" }
  ];

  function renderTerminal(instant) {
    if (!termBody) return;
    termBody.textContent = "";
    var html = "";
    termScript.forEach(function (line) {
      html +=
        '<div class="terminal-line"><span class="term-prompt">' +
        line.prompt +
        '</span><span class="term-cmd">' +
        line.cmd +
        '</span><span class="term-out"> → <span class="' +
        line.cls +
        '">' +
        line.out +
        "</span></span></div>";
    });
    termBody.innerHTML = html;

    if (!instant && !reduceMotion) {
      // Add a blinking caret to the last line, then remove it.
      var last = termBody.lastElementChild;
      var caret = doc.createElement("span");
      caret.className = "term-caret";
      caret.setAttribute("aria-hidden", "true");
      last.appendChild(caret);
      setTimeout(function () {
        caret.remove();
        // Restart after a pause to keep the component alive (lightweight).
        setTimeout(function () {
          renderTerminal(false);
        }, 9000);
      }, 4200);
    }
  }

  if (termBody) {
    if (reduceMotion) {
      renderTerminal(true);
    } else {
      // Stage 1: type out commands line by line for effect.
      (function typeTerminal() {
        termBody.textContent = "";
        var idx = 0;
        var caret = doc.createElement("span");
        caret.className = "term-caret";
        caret.setAttribute("aria-hidden", "true");
        termBody.appendChild(caret);

        function typeLine() {
          if (idx >= termScript.length) {
            caret.remove();
            setTimeout(function () {
              renderTerminal(false);
            }, 4500);
            return;
          }
          var line = termScript[idx];
          var div = doc.createElement("div");
          div.className = "terminal-line";
          div.innerHTML =
            '<span class="term-prompt">' +
            line.prompt +
            '</span><span class="term-cmd">' +
            line.cmd +
            "</span>";
          termBody.insertBefore(div, caret);
          setTimeout(function () {
            var out = doc.createElement("span");
            out.className = "term-out" + (line.cls ? " " + line.cls : "");
            out.textContent = " → " + line.out;
            div.appendChild(out);
            idx++;
            setTimeout(typeLine, 700);
          }, 420);
        }
        typeLine();
      })();
    }
  }

  /* ============================================================
     6. Hero particles (DOM, capped & lightweight)
     ============================================================ */
  var particleHost = doc.getElementById("particles");

  function spawnParticles() {
    if (!particleHost || reduceMotion) return;
    var count = window.innerWidth < 640 ? 12 : 26;
    var frag = doc.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var p = doc.createElement("span");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.width = p.style.height = (Math.random() * 2 + 2).toFixed(1) + "px";
      p.style.animationDuration = (Math.random() * 10 + 12).toFixed(1) + "s";
      p.style.animationDelay = (Math.random() * 12).toFixed(1) + "s";
      frag.appendChild(p);
    }
    particleHost.appendChild(frag);
  }
  spawnParticles();

  /* ============================================================
     7. Custom cursor (fine pointer only)
     ============================================================ */
  var cursorDot = doc.getElementById("cursorDot");
  var cursorRing = doc.getElementById("cursorRing");

  if (hasFinePointer && !reduceMotion && cursorDot && cursorRing) {
    doc.body.classList.add("cursor-on");
    var cx = -100, cy = -100;
    var rx = -100, ry = -100;
    var ringActive = false;

    var interactiveSel = "a, button, .skill-card, .project-card, input, textarea, [data-tilt]";

    doc.addEventListener("mousemove", function (e) {
      cx = e.clientX;
      cy = e.clientY;
      if (!ringActive) {
        rx = cx;
        ry = cy;
        ringActive = true;
      }
      cursorDot.style.transform =
        "translate(" + (cx - 3) + "px," + (cy - 3) + "px)";
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
    });

    (function animateRing() {
      rx += (cx - rx) * 0.18;
      ry += (cy - ry) * 0.18;
      cursorRing.style.transform =
        "translate(" + (rx - 18) + "px," + (ry - 18) + "px)";
      requestAnimationFrame(animateRing);
    })();

    doc.addEventListener("mouseover", function (e) {
      if (e.target.closest(interactiveSel)) {
        cursorRing.classList.add("is-hovering");
      }
    });

    doc.addEventListener("mouseout", function (e) {
      if (e.target.closest(interactiveSel)) {
        cursorRing.classList.remove("is-hovering");
      }
    });

    doc.addEventListener("mousedown", function () {
      cursorDot.style.transform =
        "translate(" + (cx - 3) + "px," + (cy - 3) + "px) scale(1.6)";
      cursorRing.style.transform =
        "translate(" + (rx - 18) + "px," + (ry - 18) + "px) scale(0.8)";
    });

    doc.addEventListener("mouseup", function () {
      cursorDot.style.transform =
        "translate(" + (cx - 3) + "px," + (cy - 3) + "px) scale(1)";
    });

    doc.addEventListener("mouseleave", function () {
      cursorDot.style.opacity = "0";
      cursorRing.style.opacity = "0";
      ringActive = false;
    });
  }

  /* ============================================================
     8. Magnetic buttons
     ============================================================ */
  function initMagnetic() {
    if (!hasFinePointer || reduceMotion) return;
    var magnets = doc.querySelectorAll("[data-magnetic]");

    magnets.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var relX = e.clientX - rect.left - rect.width / 2;
        var relY = e.clientY - rect.top - rect.height / 2;
        el.style.transition = "transform .12s var(--ease)";
        el.style.transform =
          "translate(" + relX * 0.2 + "px," + relY * 0.3 + "px)";
      });

      el.addEventListener("mouseleave", function () {
        el.style.transition =
          "transform .4s cubic-bezier(.22,1,.36,1)";
        el.style.transform = "";
      });
    });
  }
  initMagnetic();

  /* ============================================================
     9. Card tilt (skills & projects)
     ============================================================ */
  function initTilt() {
    if (!hasFinePointer || reduceMotion) return;
    var cards = doc.querySelectorAll("[data-tilt]");

    cards.forEach(function (card) {
      var max = 6;
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" +
          (-py * max).toFixed(2) +
          "deg) rotateY(" +
          (px * max).toFixed(2) +
          "deg) translateY(-3px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }
  initTilt();

  /* ============================================================
     10. Contact form (graceful mailto, no backend)
     ============================================================ */
  var contactForm = doc.getElementById("contactForm");
  var formStatus = doc.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = contactForm.querySelector("#cf-name");
      var email = contactForm.querySelector("#cf-email");
      var subject = contactForm.querySelector("#cf-subject");
      var message = contactForm.querySelector("#cf-message");

      var valid = true;

      [name, email, subject, message].forEach(function (field) {
        var bad = !field.value.trim();
        field.classList.toggle("is-invalid", bad);
        if (bad) valid = false;
      });

      if (email && email.value.trim()) {
        var emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        email.classList.toggle("is-invalid", emailBad);
        if (emailBad) valid = false;
      }

      if (!valid) {
        if (formStatus) {
          formStatus.textContent =
            "Please fill in all required fields with a valid email.";
          formStatus.className = "form-status is-err";
        }
        return;
      }

      var to = "kavin22cs024@gmail.com";
      var subj =
        encodeURIComponent("[Portfolio] " + subject.value.trim());
      var body =
        encodeURIComponent(
          "Name: " +
            name.value.trim() +
            "\nEmail: " +
            email.value.trim() +
            "\n\n" +
            message.value.trim()
        );

      // Opens the visitor's email client with the message pre-filled.
      window.location.href = "mailto:" + to + "?subject=" + subj + "&body=" + body;

      if (formStatus) {
        formStatus.textContent =
          "Opening your email app… If it doesn't open, email me directly at " + to + ".";
        formStatus.className = "form-status is-ok";
      }

      contactForm.reset();
    });
  }

  /* ---------- Handle browser resizes cleanly (particles stay light) ---------- */
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (particleHost && particleHost.childElementCount) {
        var ideal = window.innerWidth < 640 ? 12 : 26;
        var extra = particleHost.childElementCount - ideal;
        if (extra > 0) {
          for (var i = 0; i < extra; i++) {
            var last = particleHost.lastElementChild;
            if (last) last.remove();
          }
        }
      }
    }, 250);
  });
})();
