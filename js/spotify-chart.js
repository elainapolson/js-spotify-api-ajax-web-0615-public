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
  for (var i=0; i < tracks.length; i++) {
    songArray.push(tracks[i]['track_name']);
  }
  return songArray;
}

function chartData(labels, inputData) {
  dataSetProperties['data'] = inputData
  return {
    labels: labels,
    datasets: [dataSetProperties]
  };
}

function getSpotifyTracks(callback){
  $.ajax ({
    url: url,
    contentType: 'application/json',
    dataType: 'jsonp',
    success: callback
  });
}

function success(parsedJSON) {
  var twentyTracks = extractTop20Tracks(parsedJSON.tracks)
  var names = extractNames(twentyTracks)
  var streams = extractNumberOfStreams(twentyTracks)
  var data = chartData(names, streams)

  var ctx = $("#spotify-chart").get(0).getContext("2d");
  var myBarChart = new Chart(ctx).Bar(data);
}
