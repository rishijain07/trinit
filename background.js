let dataSent = {};
let dataReceived = {};
let carbonFootprint = {};

chrome.webRequest.onSendHeaders.addListener(
    function (details) {
        const hostname = new URL(details.url).hostname;
        if (!dataSent[hostname]) {
            dataSent[hostname] = 0;
        }
        dataSent[hostname] += details.requestHeaders.map(header => header.value).join("").length;
    },
    { urls: ["<all_urls>"] },
    ["requestHeaders"]
);

chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        const hostname = new URL(details.url).hostname;
        if (!dataReceived[hostname]) {
            dataReceived[hostname] = 0;
        }
        dataReceived[hostname] += details.responseHeaders.map(header => header.value).join("").length;
        if (!carbonFootprint[hostname]) {
            carbonFootprint[hostname] = 0;
        }
        carbonFootprint[hostname] = (dataSent[hostname] + dataReceived[hostname]) * 0.00043;
    },
    { urls: ["<all_urls>"] },
    ["responseHeaders"]
);

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (msg.type === "getData") {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                let domain = new URL(tabs[0].url).hostname;
                port.postMessage({
                    type: "data",
                    dataSent: dataSent[domain],
                    dataReceived: dataReceived[domain],
                    carbonFootprint: carbonFootprint[domain],
                });
            });
        }
    });
});