/**
 * Interactive API Flow Diagram
 * Handles animations and interactions for the solution section
 */

document.addEventListener("DOMContentLoaded", function () {
  const startFlowBtn = document.getElementById("startFlowBtn");
  const flowSteps = document.querySelectorAll(".flow-step");
  const flowArrows = document.querySelectorAll(".flow-arrow");
  const modelOptions = document.querySelectorAll(".model-option");

  if (!startFlowBtn) return;

  // Start flow animation
  startFlowBtn.addEventListener("click", function () {
    startFlow();
  });

  // Model option selection
  modelOptions.forEach((option) => {
    option.addEventListener("click", function () {
      selectModel(this);
    });
  });

  function startFlow() {
    // Reset all steps
    flowSteps.forEach((step) => step.classList.remove("active"));
    flowArrows.forEach((arrow) => arrow.classList.remove("active"));

    // Animate steps in sequence
    flowSteps.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add("active");

        // Animate arrow before next step
        if (index < flowArrows.length) {
          setTimeout(() => {
            flowArrows[index].classList.add("active");
          }, 300);
        }
      }, index * 600);
    });

    // Auto-highlight best model after flow
    setTimeout(() => {
      highlightBestModel();
    }, 2400);

    // Animate summary
    setTimeout(() => {
      animateSummary();
    }, 2800);
  }

  function selectModel(element) {
    // Remove previous selection
    modelOptions.forEach((opt) => (opt.style.backgroundColor = ""));
    modelOptions.forEach((opt) => (opt.style.borderColor = ""));

    // Highlight selected
    element.style.backgroundColor = "rgba(71, 213, 166, 0.3)";
    element.style.borderColor = "rgba(71, 213, 166, 0.8)";
  }

  function highlightBestModel() {
    // Find the best choice step
    const bestChoice = document.querySelector(".best-choice");
    if (bestChoice) {
      bestChoice.style.transform = "scale(1.05)";
      setTimeout(() => {
        bestChoice.style.transform = "scale(1)";
      }, 400);
    }
  }

  function animateSummary() {
    const summaryItems = document.querySelectorAll(".summary-item");
    summaryItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";

      setTimeout(() => {
        item.style.transition = "all 0.4s ease";
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, index * 150);
    });
  }

  // Auto-start flow on scroll into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = "true";
          setTimeout(() => {
            startFlow();
          }, 500);
        }
      });
    },
    { threshold: 0.3 },
  );

  const diagram = document.querySelector(".api-flow-diagram");
  if (diagram) {
    observer.observe(diagram);
  }
});
