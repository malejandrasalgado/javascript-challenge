// from data.js
var tableData = data;
console.log("Load Table")
// loop to display UFO sightings data
function showData(Sightingsinf) {
  var tbody = d3.select("tbody");
  Sightingsinf.forEach((ufoData) => {
    var row = tbody.append("tr");
    Object.entries(ufoData).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.html(value);
    });
  });
};
showData(tableData)

console.log("Table Loaded")
// Clear data from table so that it is empty every time we refresh
function clearTable() {
    console.log("Clearing Table");
    d3.select("tbody")
      .selectAll("tr").remove()
      .selectAll("td").remove();
  };

// bind the button to a variable to listen for a click
var button = d3.select("#filter-btn");
console.log("var button assigned");

// select records to display if filter button clicked 
button.on("click", function(event) {
  console.log("Button clicked")
  // override default functionality for button
  d3.event.preventDefault();
  // clear data from table on the screen
  console.log("Clear current data")
  clearTable();

  console.log("Loading new data into table")

  var filteredData=tableData;
  var inputId = document.getElementsByClassName("form-control");

  console.log("InputId is ",document.getElementsByClassName("form-control"))
  for (var i = 0; i < inputId.length; i++){

      var idName = inputId[i].id;
      console.log("idName", idName)
	    var field = d3.select("#" + idName).property("value").trim();
      console.log("idName value", field)
      console.log(filteredData)
      if (field !== "") {
        console.log("Filter on", idName, field)
        var filteredData = filteredData.filter(ufoSighting => 
          ufoSighting[idName].toUpperCase() === field.toUpperCase());
      }
      console.log("Filtered data length is ",filteredData.length)
    };


  // if there is no data...
      
  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>No Records Found</h4>");
  } else { showData(filteredData)}
})

