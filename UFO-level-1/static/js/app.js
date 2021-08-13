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
// As we are using American dates we should validates that the input 
// string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString)
{
    if (dateString === "")
        return true;
    
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};


// bind the button to a variable to listen for a click
var button = d3.select("#filter-btn");
console.log("var button assigned")

// select records to display if filter button clicked 
button.on("click", function(event) {
    console.log("Button clicked")
    // override default functionality for button
    d3.event.preventDefault();
    // clear data from table on the screen
    console.log("Clear current data")
    clearTable();

    console.log("Loading new data into table")
    var filterDatetime = d3.select("#datetime").property("value");
    console.log("filter is ",filterDatetime);
    filterDatetime = filterDatetime.trim();
   
    // If no filterdate entered then show everything in data list
    if (filterDatetime === "" ) {
      console.log("Showing all data")  
      var selectedData = tableData;
    } else {
        console.log("Check date is valid and filter on this")
        if (isValidDate(filterDatetime)){
            // only show data that is >= filter datetime
            console.log("Filtering data =",filterDatetime)
            var selectedData = tableData.filter(ufoSighting => 
                ufoSighting.datetime === filterDatetime);
      }
    };  
    // if there is no data...
    
    if (!isValidDate(filterDatetime)) {
        // display message in the first data row = invalid date
        d3.select("tbody")
        .append("tr")
        .append("td")
            .attr("colspan", 7)
            .html("<h4>Entered Date is Invalid - try again</h4>");       
        }
    else {
        if (selectedData.length == 0) {
            // display message in the first data row = no data found
            d3.select("tbody")
            .append("tr")
            .append("td")
                .attr("colspan", 7)
                .html("<h4>No sightings since selected date</h4>");
            
        } else{
            showData(selectedData);
        };
    }
    console.log("Finished Displaying data");
    
})

