/**
 * Interactive API Flow Diagram - Horizontal
 * Handles animations and interactions for the solution section
 */

document.addEventListener("DOMContentLoaded", function () {
  const startFlowBtn = document.getElementById("startFlowBtn");
  const flowSteps = document.querySelectorAll(".flow-step");
  const flowArrows = document.querySelectorAll(".flow-arrow");

  if (!startFlowBtn) return;

  // Start flow animation
  startFlowBtn.addEventListener("click", function () {
    startFlow();
  });

  function startFlow() {
    // Reset all steps
    flowSteps.forEach((step) => step.classList.remove("active"));
    flowArrows.forEach((arrow) => arrow.classList.remove("active"));

    // Animate steps in sequence (horizontal = left to right)
    flowSteps.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add("active");

        // Animate arrow after step
        if (index < flowArrows.length) {
          setTimeout(() => {
            flowArrows[index].classList.add("active");
          }, 200);
        }
      }, index * 400);
    });

    // Animate summary after all steps
    setTimeout(() => {
      animateSummary();
    }, 1800);
  }

  function animateSummary() {
    const summaryItems = document.querySelectorAll(".summary-item-h");
    summaryItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(10px)";

      setTimeout(() => {
        item.style.transition = "all 0.4s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 100);
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
    { threshold: 0.3 }
  );

  const diagram = document.querySelector(".api-flow-diagram");
  if (diagram) {
    observer.observe(diagram);
  }
});