// Javascript
$( document ).ready(function() {
  getResults (channels);
});
// example: https://codepen.io/FreeCodeCamp/full/Myvqmo/
// usage
// https://api.twitch.tv/kraken/streams?channel=freecodecamp,ESL_SC2
/*
use the below array with the above api call, further details on this link: 
https://github.com/justintv/Twitch-API/blob/master/v3_resources/streams.md#get-streamschannel

online, what are they streaming
offline - offline
error - account invalid

*/
// First two are deleted / banned users

//brunofin
var channels = ["nalcs1", "OgamingSC2", "storbeck", "comster404", "cretetion", "ESL_SC2", "habathcx", "RobotCaleb", "noobs2ninjas", "dawah200", "esportsarena", "summit1g", "nl_kripp"];
var url = "https://api.twitch.tv/kraken/";

var getResults = function (twData) {
  if ( twData.length < 1 ) return;
  
  var currentChannel = twData.shift();
  // console.log(data[select]);
  $.getJSON(url + "channels/" + currentChannel)
    .done(function(data, textStatus, jqXHR) {
      var info = {};
      info.logo = data.logo
      info.name = data.display_name;
      info.url = data.url;
      //console.log(data);
      
      $.getJSON(url + "streams/" + currentChannel)
        .done(function(data){
          if ( data.stream !== null ){
              info.online = true;
              info.status = data.stream.channel.status;
          } else {
            info.online = false;
            info.status = 'Offline';
          }
          //console.log(info.name);
          //console.log(data);
          display(info);
          getResults(twData);
          // status, steaming or not
          /*
          //console.log(data.stream.channel.status);
          Do not USE!!!var channel = '.' + data._links.channel.split('/')[5].toLowerCase();
          if (data.stream !== null){
            //data.stream.channel.status
            // stream, add online class
            $('tr' + channel).addClass('online');
          } else{
            // no stream, add offline class, status set to Offline
            $( 'tr' + channel).addClass('offline');
            $( 'td'+ channel ).text('offline');
          }*/
        });
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    // account closed or not found error handling
    //console.log('failed to find the name' + errorThrown.toString());
    //console.log(jqXHR);
    var info = {};
    info.logo = 'images/no-channel.jpg';
    info.name = jqXHR.responseJSON.message.split('\'')[1];
    info.status = 'Account Closed';
    info.url = '#';
    info.online = false;
    //console.log("fail: " + textStatus);
    //console.log(errorThrown.toString());
    //console.log(jqXHR.responseJSON.message);
    display(info);
    getResults(twData);
  })
  // get details about the steamers and if they currently steam
}

function display(info){
  console.log(info);
  var html = '';
  if (info.online) {
    html += '<tr class="' + info.name.toLowerCase() + ' online">';
  } else {
    html += '<tr class="' + info.name.toLowerCase() + ' offline">';
  }
  html += '<td style="width:50px;"><img class="ico" src="' + info.logo + '"></td>';
  html += '<td style="width:50px;"><a href="' + info.url + '" target="_blank">' + info.name + '</td>';
  html += '<td class="center ' + info.name.toLowerCase() + '">' + info.status + '</td>';
  html += '</tr>';
  if (info.online) $('#results').prepend( html );
  else $('#results').append( html );
}


// info on users

// image, name, status / or stream content
	

/* NOTES:
move li with a stream to the top
http://jsfiddle.net/NyxnJ/
*/

/*

for ( i = 0; i < twData.length; i++){
	console.log("loading channel: " + twData[i].channel);
	$.getJSON('https://api.twitch.tv/kraken/channels/' + twData[i].channel, function(data, twData){
  	//console.log("loading channel: " + twData[i].channel);
	})
	.done(function(data, textStatus, jqXHR){
		//.display_name
		//.logo
		//.url
		//console.log(data);
		//getStream(twData[i].channel);
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log('failed');
	})
}

// info if they currently stream 
function getStream(channel){
	$.getJSON('https://api.twitch.tv/kraken/streams/' + channel, function(data){
  		console.log("are they streaming - streams");
  		console.log(data);
	});
}

*/

