// background.js

let dataSent = 0;
let dataReceived = 0;

chrome.webRequest.onSendHeaders.addListener(
  function (details) {
    dataSent += details.requestHeaders.map(header => header.value).join("").length;
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders"]
);

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    dataReceived += details.responseHeaders.map(header => header.value).join("").length;
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (msg.type === "getData") {
      port.postMessage({
        type: "data",
        dataSent: dataSent,
        dataReceived: dataReceived,
        carbonFootprint: (dataSent + dataReceived) * 0.00043,
      });
    }
  });
});
