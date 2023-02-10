// Get the data from local storage and store it in an array
var websiteData = [];
for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  var value = localStorage.getItem(key);
  var website = {
    url: key,
    carbonFootprint: value
  };
  websiteData.push(website);
}

// Sort the data in the array so that the websites with the highest carbon footprint are first
websiteData.sort(function(a, b) {
  return b.carbonFootprint - a.carbonFootprint;
});

// Populate the table with the data
var table = document.querySelector('table');
for (var i = 0; i < websiteData.length; i++) {
  var row = document.createElement('tr');
  var rankCell = document.createElement('td');
  rankCell.innerHTML = i + 1;
  var urlCell = document.createElement('td');
  urlCell.innerHTML = websiteData[i].url;
  var carbonFootprintCell = document.createElement('td');
  carbonFootprintCell.innerHTML = websiteData[i].carbonFootprint;
  row.appendChild(rankCell);
  row.appendChild(urlCell);
  row.appendChild(carbonFootprintCell);
  table.appendChild(row);
}
