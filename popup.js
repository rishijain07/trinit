document.addEventListener("DOMContentLoaded", function() {
    chrome.runtime.sendMessage({type: "getData"}, function(response) {
      document.getElementById("data-sent").textContent = response.totalDataSent;
      document.getElementById("data-received").textContent = response.totalDataReceived;
    });
  });