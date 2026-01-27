/**
 * Chart.js Configuration for Cost Comparison Chart
 * Integrated into LiteLLM Gateway landing page
 * This file works alongside main.js - no conflicts
 */

document.addEventListener("DOMContentLoaded", function () {
  // ===================================
  // Chart.js Initialization
  // ===================================

  const chartCanvas = document.getElementById("cost-comparison-chart");

  if (chartCanvas) {
    const ctx = chartCanvas.getContext("2d");

    const costComparisonChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "2015",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: "#d94a4a",
            fill: false,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: "#d94a4a",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            data: [6, 10, 9, 6, 14, 12, 16, 13, 9, 7, 6, 10],
          },
          {
            label: "2016",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: "#47d5a6",
            fill: false,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: "#47d5a6",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            data: [10, 8, 6, 5, 12, 8, 16, 17, 6, 7, 6, 10],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "#8b8b8b",
              font: {
                family: "'Inter', sans-serif",
                size: 13,
                weight: "500",
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            backgroundColor: "rgba(18, 18, 18, 0.9)",
            titleColor: "#ffffff",
            bodyColor: "#8b8b8b",
            borderColor: "#333333",
            borderWidth: 1,
            padding: 12,
            titleFont: {
              family: "'Inter', sans-serif",
              size: 13,
              weight: "600",
            },
            bodyFont: {
              family: "'Inter', sans-serif",
              size: 12,
            },
            usePointStyle: true,
            boxPadding: 8,
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(63, 63, 63, 0.3)",
              drawBorder: false,
              drawTicks: false,
            },
            ticks: {
              color: "#717171",
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(63, 63, 63, 0.3)",
              drawBorder: false,
              drawTicks: false,
            },
            ticks: {
              color: "#717171",
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
              padding: 8,
            },
          },
        },
      },
    });
  }
});
