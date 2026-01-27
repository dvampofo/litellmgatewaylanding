/**
 * Dashboard JavaScript
 * Handles dashboard interactivity, chart rendering, and live data updates
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the cost trend chart
  const priceChartCanvas = document.getElementById("price-chart");
  if (priceChartCanvas) {
    const ctx = priceChartCanvas.getContext("2d");

    // Generate cost trend data (cumulative cost over time)
    const generateChartData = (days = 30) => {
      const data = [];
      const today = new Date();
      let cumulativeCost = 0;
      const dailyBudget = 45.2 / days; // Spread monthly cost evenly

      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        // Add daily cost with slight variation (some days more usage)
        const dailyVariation = dailyBudget * (0.7 + Math.random() * 0.6); // 70-130% of average
        cumulativeCost += dailyVariation;

        data.push({
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          value: parseFloat(cumulativeCost.toFixed(2)),
        });
      }

      return data;
    };

    const chartData = generateChartData(30);

    const priceChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.map((d) => d.date),
        datasets: [
          {
            label: "Cumulative Monthly Cost",
            data: chartData.map((d) => d.value),
            borderColor: "#4967bc",
            backgroundColor: "rgba(73, 103, 188, 0.1)",
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(22, 27, 46, 0.95)",
            titleColor: "#e2e8f0",
            bodyColor: "#e2e8f0",
            borderColor: "#4967bc",
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function (context) {
                return (
                  "$" +
                  context.raw.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })
                );
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(73, 103, 188, 0.1)",
              drawBorder: false,
            },
            ticks: {
              color: "#94a3b8",
              font: {
                size: 11,
              },
            },
          },
          y: {
            grid: {
              color: "rgba(73, 103, 188, 0.1)",
              drawBorder: false,
            },
            ticks: {
              color: "#94a3b8",
              font: {
                size: 11,
              },
              callback: function (value) {
                return (
                  "$" +
                  value.toLocaleString("en-US", { maximumFractionDigits: 0 })
                );
              },
            },
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
      },
    });

    // Update chart on timeframe change
    const timeframeSelect = document.getElementById("timeframe-select");
    if (timeframeSelect) {
      timeframeSelect.addEventListener("change", function () {
        const days = parseInt(this.value);
        const newData = generateChartData(days);

        priceChart.data.labels = newData.map((d) => d.date);
        priceChart.data.datasets[0].data = newData.map((d) => d.value);
        priceChart.update();
      });
    }
  }

  // Simulate live data updates for stat cards
  setInterval(() => {
    // Update monthly cost (slight variations based on usage)
    const monthlyCostElement = document.getElementById("monthly-cost");
    if (monthlyCostElement) {
      let cost = parseFloat(monthlyCostElement.textContent.replace("$", ""));
      cost = cost * (1 + ((Math.random() - 0.5) * 0.5) / 100); // ±0.25% variation
      monthlyCostElement.textContent = "$" + cost.toFixed(2);
    }

    // Update cost per 1M tokens
    const costPerMillionElement = document.getElementById("cost-per-million");
    if (costPerMillionElement) {
      let cost = parseFloat(costPerMillionElement.textContent.replace("$", ""));
      cost = cost * (1 + ((Math.random() - 0.5) * 0.3) / 100); // ±0.15% variation
      costPerMillionElement.textContent = "$" + cost.toFixed(2);
    }

    // Update savings vs GPT-4
    const savingsElement = document.getElementById("savings-vs-gpt4");
    if (savingsElement) {
      let savings = parseFloat(savingsElement.textContent.replace("$", ""));
      savings = savings * (1 + ((Math.random() - 0.5) * 0.4) / 100); // ±0.2% variation
      savingsElement.textContent = "$" + savings.toFixed(2);
    }

    // Update total tokens (slight usage growth)
    const totalTokensElement = document.getElementById("total-tokens");
    if (totalTokensElement) {
      let tokens = parseFloat(totalTokensElement.textContent.replace("M", ""));
      tokens = tokens * (1 + ((Math.random() - 0.5) * 0.1) / 100); // Minimal variation
      totalTokensElement.textContent = tokens.toFixed(1) + "M";
    }
  }, 5000);

  // Search functionality for model names
  const searchInput = document.getElementById("dashboard-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll("#model-table-body tr");

      rows.forEach((row) => {
        const name = row.cells[0].textContent.toLowerCase();
        if (name.includes(searchTerm)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
});
