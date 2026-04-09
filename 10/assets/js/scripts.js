function setupNotifications() {
  const buyNotifications = [
    {
      name: "John D.",
      location: "New York, NY",
      time: "30 seconds ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Sarah K.",
      location: "Los Angeles, CA",
      time: "1 minute ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Michael P.",
      location: "Chicago, IL",
      time: "2 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Emma R.",
      location: "Miami, FL",
      time: "3 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "David W.",
      location: "Dallas, TX",
      time: "4 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Olivia H.",
      location: "Seattle, WA",
      time: "5 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Daniel S.",
      location: "Boston, MA",
      time: "6 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Sophia L.",
      location: "San Francisco, CA",
      time: "7 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "James B.",
      location: "Houston, TX",
      time: "8 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Mia T.",
      location: "Phoenix, AZ",
      time: "9 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Ethan G.",
      location: "Atlanta, GA",
      time: "10 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Isabella M.",
      location: "Philadelphia, PA",
      time: "11 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Alexander C.",
      location: "Denver, CO",
      time: "12 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Charlotte V.",
      location: "San Diego, CA",
      time: "13 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Benjamin F.",
      location: "Orlando, FL",
      time: "14 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
    {
      name: "Amelia Z.",
      location: "Austin, TX",
      time: "15 minutes ago",
      kit: "6 bottles",
      img: "assets/images/product/6kits.webp",
    },
  ];

  const notificationWrapper = document.getElementById("purchased-notification");
  const notificationContent = document.getElementById("notification-content");
  const nameEl = document.getElementById("notification-name");
  const textEl = document.getElementById("notification-text");
  const locationEl = document.getElementById("notification-location");
  const imgEl = document.getElementById("notification-image");

  function showNotification(notification) {
    // Fill in data
    nameEl.textContent = notification.name;
    locationEl.textContent = notification.location;
    textEl.textContent = `Purchased ${notification.kit} • ${notification.time}`;
    imgEl.src = notification.img;

    // Show wrapper
    notificationWrapper.classList.remove("hidden");

    // Animate in
    requestAnimationFrame(() => {
      notificationContent.classList.remove("opacity-0", "translate-y-4");
      notificationContent.classList.add("opacity-100", "translate-y-0");
    });

    // Auto-hide after 5s
    setTimeout(() => {
      notificationContent.classList.remove("opacity-100", "translate-y-0");
      notificationContent.classList.add("opacity-0", "translate-y-4");

      // Fully hide after animation ends
      setTimeout(() => {
        notificationWrapper.classList.add("hidden");
      }, 500);
    }, 5000);
  }

  // Random interval between 8–15s
  function startNotifications() {
    setInterval(() => {
      const randomNotification =
        buyNotifications[Math.floor(Math.random() * buyNotifications.length)];
      showNotification(randomNotification);
    }, Math.floor(Math.random() * (15000 - 8000) + 8000));
  }

  // Start
  startNotifications();
}

function setupCommentSection() {
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  const hiddenComments = document.getElementById("hidden-comments");

  if (viewMoreBtn && hiddenComments) {
    viewMoreBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior if it was an <a> tag

      // Toggle the visibility of the hidden comments container
      const isHidden = hiddenComments.classList.toggle("hidden");

      // Update the button text based on the visibility state
      if (isHidden) {
        this.textContent = "View more comments...";
      } else {
        this.textContent = "Show less comments";
      }
    });
  }
}

function setupDate() {
  const dateElement = document.getElementById("date-now");
  const today = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  dateElement.textContent = formattedDate;
}

function setupRemainingBottles() {
  const remainingBottlesElements =
    document.querySelectorAll("#bottles-remaining");
  const initialBottles = 89;
  const interval = 2 * 60 * 1000; // 2 minutes in milliseconds

  const updateText = (text) => {
    remainingBottlesElements.forEach((element) => {
      element.textContent = text;
    });
  };

  let remainingBottles = initialBottles;
  const updateRemainingBottles = () => {
    if (remainingBottles > 6) {
      remainingBottles--;
      updateText(remainingBottles);
    } else {
      clearInterval(bottleInterval);
    }
  };

  const bottleInterval = setInterval(updateRemainingBottles, interval);
  // Clear the interval when the page is unloaded
  window.addEventListener("beforeunload", () => {
    clearInterval(bottleInterval);
  });
}

// all anchors with href starting with # do a smooth scroll
function setupSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  });
}

function setupDateTestimonials() {
  // #date-testimonial ->  January 24, 2025
  // get all #date-testimonial elements and set their text content to the current date and subtract 1-3 day at each iteration
  const testimonialDates = document.querySelectorAll("#date-testimonial");
  const today = new Date();

  testimonialDates.forEach((dateElement, index) => {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - (index + 1)); // Subtract 1-3 days based on index
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = pastDate.toLocaleDateString("en-US", options);
    dateElement.textContent = formattedDate;
  });
}

function setupFaq() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const header = item.querySelector(".faq-question");

    header.addEventListener("click", () => {
      // Close all open items
      items.forEach((el) => {
        if (el !== item) {
          el.classList.remove("open");
          el.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      // Toggle current item
      const content = item.querySelector(".faq-answer");
      if (item.classList.contains("open")) {
        item.classList.remove("open");
        content.style.maxHeight = null;
      } else {
        item.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

function setupQuiz() {
  const quizContainer = document.getElementById("quiz-container");
  const steps = quizContainer.querySelectorAll(".quiz-step");
  let currentStep = 1; // Start at step 1

  function showStep(stepNumber) {
    steps.forEach((step) => (step.style.display = "none")); // Hide all steps
    const nextStepElement = document.getElementById(`quiz-step-${stepNumber}`);
    if (nextStepElement) {
      if (nextStepElement.classList.contains("last-step")) {
        nextStepElement.style.display = "flex";
      } else {
        nextStepElement.style.display = "block";
      }

      currentStep = stepNumber;
      console.log(`Showing step ${stepNumber}`);

      // Special handling for the loading step (Step 8)
      if (stepNumber === 8) {
        startLoadingAnimation();
      }
    } else {
      console.error(`Step ${stepNumber} not found.`);
    }
  }

  function startLoadingAnimation() {
    const progressBar = document.querySelector("#quiz-step-8 .progress-bar");
    const timerElement = document.getElementById("loading-timer");
    let timeLeft = 3; // 3 seconds duration

    if (!progressBar || !timerElement) {
      console.error("Progress bar or timer element not found.");
      return;
    }

    if (!progressBar || !timerElement) return;

    // Reset progress bar and timer
    progressBar.style.width = "0%";
    timerElement.textContent = `Time remaining: ${timeLeft} seconds`;

    // Force reflow to restart animation
    void progressBar.offsetWidth;

    // Start animation
    progressBar.style.width = "100%";

    // Update timer countdown
    const intervalId = setInterval(() => {
      timeLeft--;
      if (timeLeft >= 0) {
        timerElement.textContent = `Time remaining: ${timeLeft} seconds`;
      } else {
        timerElement.textContent = `Time remaining: 0 seconds`; // Ensure it shows 0 at the end
      }
    }, 1000); // Update every second

    // Move to the next step after 3 seconds
    setTimeout(() => {
      clearInterval(intervalId); // Stop the timer interval
      showStep(9); // Go to Step 9 (Results)
    }, 3000); // 3000 milliseconds = 3 seconds
  }

  // --- Event Listeners ---

  // Option buttons (for single-choice steps 1-5)
  quizContainer.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      const nextStepId = button.getAttribute("data-next");
      if (nextStepId) {
        const nextStepNumber = parseInt(nextStepId.split("-")[2]);
        showStep(nextStepNumber);
      }
    });
  });

  // "Next" buttons (for multiple-choice steps 6-7)
  quizContainer.querySelectorAll(".quiz-next").forEach((button) => {
    button.addEventListener("click", () => {
      const nextStepId = button.getAttribute("data-next");
      if (nextStepId) {
        const nextStepNumber = parseInt(nextStepId.split("-")[2]);
        showStep(nextStepNumber);
      }
    });
  });

  // "Prev" buttons
  quizContainer.querySelectorAll(".quiz-prev").forEach((button) => {
    button.addEventListener("click", () => {
      const prevStepId = button.getAttribute("data-prev");
      if (prevStepId) {
        const prevStepNumber = parseInt(prevStepId.split("-")[2]);
        showStep(prevStepNumber);
      }
    });
  });

  // Final "Unlock" button (add functionality as needed)
  const unlockButton = document.getElementById("unlock-button");
  if (unlockButton) {
    unlockButton.addEventListener("click", () => {
      // Hide quiz and reveal .esconder2 with effect
      quizContainer.style.display = "none";
      const esconder2 = document.querySelector(".esconder2");
      esconder2.style.display = "block";
      esconder2.style.opacity = "0";
      // Add fade in animation
      setTimeout(() => {
        esconder2.style.transition = "opacity 0.5s ease-in";
        esconder2.style.opacity = "1";
      }, 50);
      setTimeout(() => {
        // scrollTo #products
        const products = document.getElementById("products");
        products.scrollIntoView({ behavior: "smooth" });
      }, 500); // Reset transition after 0.5s for a smooth transition fro

      // set quizAlreadyCompleted to true
      localStorage.setItem("quizAlreadyCompleted", true);
    });
  }

  // Initialize: Show the first step when the page loads
  showStep(1);

  // Check if the quiz has been completed before
  const quizAlreadyCompleted = localStorage.getItem("quizAlreadyCompleted");
  if (quizAlreadyCompleted) {
    // Hide quiz and reveal.esconder2 with effect
    // quizContainer.style.display = "none";
    const esconder2 = document.querySelector(".esconder2");
    esconder2.style.display = "block";
    esconder2.style.opacity = "0";
    // Add fade in animation
    setTimeout(() => {
      esconder2.style.transition = "opacity 0.5s ease-in";
      esconder2.style.opacity = "1";
    });
  }
}

// Função para obter todos os parâmetros da URL atual
function getUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  let params = [];
  for (let [key, value] of urlParams) {
    params.push(`${key}=${value}`);
  }
  return params.join("&");
}

// Função para adicionar os parâmetros da URL aos links de checkout
function updateCheckoutLinks() {
  // Captura todos os parâmetros da URL atual
  const queryString = getUrlParameters();

  // Verifica se há parâmetros para adicionar
  if (queryString) {
    // Encontra todos os links de checkout
    const checkoutLinks = document.querySelectorAll(
      'a[href*="https://payment.theDropFit.com/checkout/"]'
    );

    checkoutLinks.forEach((link) => {
      // Captura o href original
      let checkoutUrl = link.href;

      // Verifica se o URL já contém parâmetros
      if (checkoutUrl.includes("?")) {
        // Se já houver parâmetros, adiciona os novos parâmetros com '&'
        checkoutUrl += `&${queryString}`;
      } else {
        // Se não houver parâmetros, adiciona os novos parâmetros com '?'
        checkoutUrl += `?${queryString}`;
      }

      // Atualiza o atributo href do link com a nova URL
      link.href = checkoutUrl;
    });
  }
}

function showEls() {
  const escondidos = document.querySelectorAll(".esconder");
  const esconder2 = document.querySelectorAll(".esconder2");

  // Exibe todos os elementos com a classe "esconder"
  escondidos.forEach((el) => {
    el.style.display = "block";
    el.style.opacity = "0"; // Inicia com opacidade 0 para o efeito de fade-in
    el.style.transition = "opacity 0.5s ease-in"; // Define a transição de opacidade
    setTimeout(() => {
      el.style.opacity = "1"; // Altera a opacidade para 1 após 50ms para iniciar o efeito de fade-in
    }, 50);
  });

  // Exibe o elemento com a classe "esconder2"
  esconder2.forEach((el) => {
    el.style.display = "block";
    el.style.opacity = "0"; // Inicia com opacidade 0 para o efeito de fade-in
    el.style.transition = "opacity 0.5s ease-in"; // Define a transição de opacidade
    setTimeout(() => {
      el.style.opacity = "1"; // Altera a opacidade para 1 após 50ms para iniciar o efeito de fade-in
    }, 50);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is ready. Setting up features...");
  setupCommentSection();
  // setupDate();
  setupRemainingBottles();
  setupSmoothScroll();
  setupDateTestimonials();
  setupFaq();
  // setupQuiz();
  updateCheckoutLinks();
});
