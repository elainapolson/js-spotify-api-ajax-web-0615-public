var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";

var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count', 
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
}

$(function() {
  getSpotifyTracks(success);
});

function extractTop20Tracks(tracks) {
  return tracks.slice(0,20);
}

function extractNumberOfStreams(tracks) {
  var streamArray = [];
  for (var i=0; i < tracks.length; i++) {
    streamArray.push(tracks[i]['num_streams']);
  }
  return streamArray;
}

function extractNames(tracks) {
  var songArray = [];
  var tracks = tracks;
  for (var i=0; i < tracks.length; i++) {
    songArray.push(tracks[i]['track_name']);
  }
  return songArray;
}

function chartData(labels, inputData) {
  var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count', 
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)',
  data: inputData
  }
  return {
    labels: labels,
    datasets: [dataSetProperties]
  };
}

function getSpotifyTracks(callback){
  var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";
  $.ajax ({
    url: url,
    contentType: 'application/json',
    dataType: 'jsonp',
    success: callback
  });
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received

  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  var twentyTracks = extractTop20Tracks(parsedJSON.tracks)
  var names = extractNames(twentyTracks)
  var streams = extractNumberOfStreams(twentyTracks)
  var data = chartData(names, streams)

  var ctx = $("#spotify-chart").get(0).getContext("2d");
  var myBarChart = new Chart(ctx).Bar(data);
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractNumberOfStreams - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
}
