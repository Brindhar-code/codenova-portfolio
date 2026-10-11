document.addEventListener("DOMContentLoaded", () => {

  // 1. Interactive project cards
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      // Don't select the card when clicking its links or buttons.
      if (event.target.closest("a, button")) return;

      card.classList.toggle("selected");
    });

    // Enable keyboard interaction.
    if (!card.hasAttribute("tabindex")) {
      card.setAttribute("tabindex", "0");
    }

    card.addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        !event.target.closest("a, button")
      ) {
        event.preventDefault();
        card.classList.toggle("selected");
      }
    });
  });


  // 2. Typing animation
  const typingText = document.getElementById("typing-text");

  if (typingText) {
    const roles = [
      "Developer",
      "AI Enthusiast",
      "Creative Problem Solver",
      "Future Innovator"
    ];

    let roleIndex = 0;

    setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      typingText.textContent = roles[roleIndex];
    }, 2000);
  }


  // 3. Smooth scrolling for normal in-page links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      // The Let's Talk button is handled separately below.
      if (link.id === "letsTalkBtn") return;

      const target = document.getElementById(targetId.slice(1));

      if (target && !target.hidden) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches ? "auto" : "smooth",
          block: "start"
        });
      }
    });
  });


  // 4. Contact buttons: open the same hidden contact form
  const letsTalkBtn = document.getElementById("letsTalkBtn");
  const contactSection = document.getElementById("contact");

  function openContactForm(event) {
    if (event) event.preventDefault();

    if (!contactSection) return;

    // Reveal the form
    contactSection.hidden = false;

    // Scroll to the contact form
    contactSection.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth",
      block: "start"
    });
  }

  // Let's Talk button
  if (letsTalkBtn) {
    letsTalkBtn.addEventListener("click", openContactForm);
  }

  // Top navigation Contact button
  document.querySelectorAll('a[href="#contact"]').forEach(button => {
    button.addEventListener("click", openContactForm);
  });


  // 5. Contact form demo submission
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      // Prevent page reload and email-app opening.
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (formStatus) {
        formStatus.textContent =
          "🎉 Thank you! Your form demo was submitted successfully.";
      }
    });
  }

});