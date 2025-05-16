// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuToggle.setAttribute(
        "aria-expanded",
        nav.classList.contains("active")
      );
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      nav &&
      nav.classList.contains("active") &&
      !e.target.closest("nav") &&
      !e.target.closest(".menu-toggle")
    ) {
      nav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Form Validation
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      markInvalid(input, "This field is required");
      isValid = false;
    } else if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        markInvalid(input, "Please enter a valid email address");
        isValid = false;
      } else {
        markValid(input);
      }
    } else {
      markValid(input);
    }
  });

  return isValid;
}

function markInvalid(input, message) {
  input.classList.add("invalid");
  input.classList.remove("valid");

  // Create or update error message
  let errorDiv = input.nextElementSibling;
  if (!errorDiv || !errorDiv.classList.contains("error-message")) {
    errorDiv = document.createElement("div");
    errorDiv.classList.add("error-message");
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  }
  errorDiv.textContent = message;
}

function markValid(input) {
  input.classList.remove("invalid");
  input.classList.add("valid");

  // Remove error message if it exists
  const errorDiv = input.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains("error-message")) {
    errorDiv.remove();
  }
}

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (validateForm(contactForm)) {
        // Show success message
        const successMessage = document.createElement("div");
        successMessage.classList.add("success-message");
        successMessage.textContent =
          "Thank you for your message! We'll get back to you soon.";

        const existingMessage = contactForm.querySelector(".success-message");
        if (existingMessage) {
          existingMessage.remove();
        }

        contactForm.appendChild(successMessage);
        contactForm.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }
});
