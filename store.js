// Save the carbon footprint data for a website in localStorage
function saveCarbonFootprintData(url, carbonFootprint) {
    localStorage.setItem(url, carbonFootprint);
  }
  
  // Retrieve the carbon footprint data for a website from localStorage
  function getCarbonFootprintData(url) {
    return localStorage.getItem(url);
  }
  