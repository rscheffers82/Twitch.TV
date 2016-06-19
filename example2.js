var wikiEndpoint = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='

var updateResults = function (articles) {
  // First, empty our results
  $('#searchResults').empty();
  
  // Check to see if the first entry is a "May refer to"
  // entry. If it is, delete it.
  if ( articles[0].snippet.toLowerCase().includes( "may refer to:" ) ) {
    articles.splice(0, 1);
  }
  
  var resultsToAdd = [];
  
  for (var i = 0; i < articles.length; i++) {
    var newResult = '<a href="' + articles[i].link + '" target="_blank">';
    newResult += '  <div class="result well animated fadeInUp">';
    newResult += '    <h3>' + articles[i].title + '</h3>';
    newResult += '    <p>' + articles[i].snippet + '</p>';
    newResult += '  </div>';
    newResult += '</a>';
    resultsToAdd.push(newResult);
  }
  
  // Slowly add the elements to the DOM
  slowlyAddResults(resultsToAdd);
};

var slowlyAddResults = function (results) {
  // The goal is to wait a specified time, pop a a result from the array, add it 
  // to the DOM, and then recursively call this function again with whatever elements
  // are left in the array
  
  // Delay in milliseconds
  var delay = 100;
  
  window.setTimeout(function () {
    if (results.length > 0) {
      // Shift an element off of the array, and add it to the DOM
      var newResult = results.shift();
      $('#searchResults').append(newResult);
      // Now recursively call this function again to slowly add the rest of the elements
      slowlyAddResults(results);
    }
  }, delay);
};

var processSearchResult = function(json) {
  var titles = json[1];
  var snippets = json[2];
  var links = json[3];
  var articles = [];
  
  // Check to make sure that we didn't get an empty result set. If we did, show an error
  if (titles.length < 1) {
    titles.push("No results");
    snippets.push("I'm sorry, no results were found for your search.");
    links.push("#");
  }
  
  for (var i = 0; i < titles.length; i++) {
    articles[i] = {};
    articles[i].title = titles[i];
    articles[i].snippet = snippets[i];
    articles[i].link = links[i];
  }
  
  updateResults(articles);
};

var performSearch = function(term) {
  $.ajax({
    url: wikiEndpoint + encodeURI(term),
    jsonp: "callback",
    dataType: "jsonp",
    success: function(response) {
      processSearchResult(response);
    }
  });
};

var executeSearch = function (event) {
  event.preventDefault();
  var searchTerm = $('#searchInput').val();
  performSearch(searchTerm);
};

$(document).ready(function() {
  // Set up our search button
  $('#searchButton').on('click', function(e) {
      executeSearch(e);
  });
  
  $('#searchInput').keypress(function (e) {
    if (e.which == 13) {
      executeSearch(e);
    }
  });
});