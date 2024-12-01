particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { 
      type: "circle", 
      stroke: { width: 0, color: "#000000" } 
    },
    opacity: { value: 0.5, random: false },
    size: { value: 3, random: true },
    line_linked: { 
      enable: true, 
      distance: 150, 
      color: "#ffffff", 
      opacity: 0.4, 
      width: 1 
    },
    move: { 
      enable: true, 
      speed: 6, 
      direction: "none", 
      random: false, 
      straight: false, 
      out_mode: "out", 
      bounce: false 
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

// Wikipedia Search Logic
document.getElementById("searchInput").addEventListener("input", function() {
  const query = this.value.trim();
  if (query.length >= 3) {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.extract) {
          document.getElementById("result").style.display = "block";
          document.getElementById("resultTitle").textContent = data.title;
          document.getElementById("resultSummary").textContent = data.extract;
          document.getElementById("copyBtn").disabled = false;
        } else {
          document.getElementById("result").style.display = "none";
        }
      })
      .catch(err => {
        console.error(err);
        document.getElementById("result").style.display = "none";
      });
  } else {
    document.getElementById("result").style.display = "none";
  }
});

function copyToClipboard() {
  const summaryText = document.getElementById("resultSummary").textContent;
  navigator.clipboard.writeText(summaryText).then(() => {
    alert("Summary copied to clipboard!");
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}
