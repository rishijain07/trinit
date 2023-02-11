window.onload = function () {
    localStorage.setItem('domainsData', JSON.stringify(domainsData));

// Retrieve the data from the local storage

    var data = localStorage.getItem('domainsData');
    var parsedData = JSON.parse(domainsData);
    var carbonFootprints = [];
    for (var i = 0; i < parsedData.length; i++) {
        var carbonFootprint = parsedData[i].carbonFootprint;
        carbonFootprints.push(carbonFootprint);
    }
    carbonFootprints.sort(function (a, b) {
        return a - b;
    });
    var greenThreshold = 100;
    var semiGreenThreshold = 500;

    var categorizedPages = [];
    for (var i = 0; i < parsedData.length; i++) {
        var page = parsedData[i];
        if (page.carbonFootprint <= greenThreshold) {
            page.category = 'Green';
        } else if (page.carbonFootprint <= semiGreenThreshold) {
            page.category = 'Semi-Green';
        } else {
            page.category = 'Non-Green';
        }
        categorizedPages.push(page);
    }

    // Get reference to the table body
    var tbody = document.getElementById("footprintData");

    // Iterate through the categorized pages and add a row for each website
    for (var i = 0; i < categorizedPages.length; i++) {
        var website = categorizedPages[i].website;
        var dataSent = categorizedPages[i].dataSent;
        var dataReceived = categorizedPages[i].dataReceived;
        var carbonFootprint = categorizedPages[i].carbonFootprint;
        var category = categorizedPages[i].category;
        var row = "<tr><td>" + website + "</td><td>" + dataSent + "</td><td>" + dataReceived + "</td><td>" + carbonFootprint + "</td><td class='" + category.toLowerCase() + "'>" + category + "</td></tr>";
        tbody.innerHTML += row;
    }
};
