// Background script for browser extension

// Keep track of total data sent and received
var totalDataSent = 0;
var totalDataReceived = 0;

// Listen for network requests
chrome.webRequest.onCompleted.addListener(
  function(details) {
    totalDataSent += details.requestBody.raw[0].bytesSent;
    totalDataReceived += details.responseBody.raw[0].bytesReceived;
  },
  { urls: ["<all_urls>"] }
);

// Listen for requests to calculate carbon footprint
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type === "calculateFootprint") {
      // Calculate carbon footprint based on data sent and received
      // Assume that 1 MB of data transfer results in 0.0002 kg of CO2 emissions
      var carbonFootprint = (totalDataSent + totalDataReceived) * 0.0002 / 1000000;

      sendResponse({ carbonFootprint: carbonFootprint });
    }
  }
);
