// popup.js

const dataSentElement = document.getElementById("data-sent");
const dataReceivedElement = document.getElementById("data-received");
const carbonFootprintElement = document.getElementById("carbon-footprint");

const port = chrome.runtime.connect({ name: "popup" });

port.postMessage({ type: "getData" });

port.onMessage.addListener(function (msg) {
  if (msg.type === "data") {
    dataSentElement.innerHTML = msg.dataSent + " bytes";
    dataReceivedElement.innerHTML = msg.dataReceived + " bytes";
    carbonFootprintElement.innerHTML = msg.carbonFootprint + " kg CO2";
  }
});
