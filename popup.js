const dataSentElement = document.getElementById("data-sent");
const dataReceivedElement = document.getElementById("data-received");
const carbonFootprintElement = document.getElementById("carbon-footprint");

const port = chrome.runtime.connect({ name: "popup" });

port.postMessage({ type: "getData" });

port.onMessage.addListener(function (msg) {
  if (msg.type === "data") {
    const dataSent = msg.dataSent;
    const dataReceived = msg.dataReceived;
    const carbonFootprint = msg.carbonFootprint;
    dataSentElement.innerHTML = dataSent + " bytes";
    dataReceivedElement.innerHTML = dataReceived + " bytes";
    carbonFootprintElement.innerHTML = carbonFootprint + " kg CO2";

    const domainsData = JSON.parse(localStorage.getItem("domainsData")) || {};

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      var hostname = new URL(currentTab.url).hostname;
      const currentDomain = hostname;
      console.log(currentDomain);

      if (!domainsData[currentDomain]) {
        domainsData[currentDomain] = {
          dataSent,
          dataReceived,
          carbonFootprint,
        };
      } else {
        domainsData[currentDomain].dataSent += dataSent;
        domainsData[currentDomain].dataReceived += dataReceived;
        domainsData[currentDomain].carbonFootprint += carbonFootprint;
      }

      localStorage.setItem("domainsData", JSON.stringify(domainsData));

    });


  }
});

const tableBody = document.getElementById("table-body");

const renderTable = () => {
  const domainsData = JSON.parse(localStorage.getItem("domainsData")) || {};
  tableBody.innerHTML = "";
  Object.entries(domainsData).forEach(([domain, data]) => {
    const tr = document.createElement("tr");
    const domainTd = document.createElement("td");
    domainTd.innerHTML = domain;
    const carbonFootprintTd = document.createElement("td");
    carbonFootprintTd.innerHTML = data.carbonFootprint + " g CO2";
    const dataSentTd = document.createElement("td");
    dataSentTd.innerHTML = data.dataSent + " bytes";
    const dataReceivedTd = document.createElement("td");
    dataReceivedTd.innerHTML = data.dataReceived + " bytes";
    tr.appendChild(domainTd);
    tr.appendChild(carbonFootprintTd);
    tr.appendChild(dataSentTd);
    tr.appendChild(dataReceivedTd);
    tableBody.appendChild(tr);
  });
};

window.addEventListener("load", renderTable);
