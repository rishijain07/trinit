var totalDataSent = 0;
var totalDataReceived = 0;

chrome.webRequest.onSendHeaders.addListener(
  function(details) {
    totalDataSent += details.requestHeaders.map(header => header.value).join("").length;
  },
  {urls: ["<all_urls>"]},
  ["requestHeaders"]
);
chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
      totalDataReceived += details.responseHeaders.map(header => header.value).join("").length;
    },
    {urls: ["<all_urls>"]},
    ["responseHeaders"]
  );