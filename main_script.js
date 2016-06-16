// Javascript
$( document ).ready(function() {

});

// usage
// https://api.twitch.tv/kraken/streams?channel=freecodecamp,ESL_SC2
/*
use the below array with the above api call, further details on this link: 
https://github.com/justintv/Twitch-API/blob/master/v3_resources/streams.md#get-streamschannel

*/
// First two are deleted / banned users

//brunofin
var twData = ["freecodecamp", "RobotCaleb", "comster404", "cretetion", "ESL_SC2", "OgamingSC2", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "dawah200", "esportsarena", "summit1g", "nl_kripp"];
var url = "https://api.twitch.tv/kraken/";

for ( var select in twData ){
  // console.log(data[select]);
  $.getJSON(url + "channels/" + twData[select])
  .done(function(data, textStatus, jqXHR) {
    var info = [];
    info.logo = data.logo
    info.name = data.display_name;
    info.status = data.status;
    info.url = data.url;
    //console.log(data);
    display(info);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    // account closed or not found error handling
    //console.log('failed to find the name' + errorThrown.toString());
    //console.log(jqXHR);
    var info = [];
    info.logo = 'images/no-channel.jpg';
    info.name = jqXHR.responseJSON.message.split('\'')[1];
    info.status = 'Account Closed';
    info.url = '#';
    //console.log("fail: " + textStatus);
    //console.log(errorThrown.toString());
    //console.log(jqXHR.responseJSON.message);
    display(info);      
  })
  // get details about the steamers and if they currently steam
  $.getJSON(url + "streams/" + twData[select])
  .done(function(data){
    console.log(data);
    //console.log(data.stream.channel.status);
    var channel = '.' + data._links.channel.split('/')[5].toLowerCase();
    if (data.stream !== null){
      //data.stream.channel.status
      // stream, add online class
      $('tr' + channel).addClass('online');
    } else{
      // no stream, add offline class, status set to Offline
      $( 'tr' + channel).addClass('offline');
      $( 'td'+ channel ).text('offline');
    }
  });
}

function display(info){
  console.log(info);
  var html = '<tr class="' + info.name.toLowerCase() + '"><td style="width:50px;">' +
  '<img class="ico" src="' + info.logo + '"></td>' +
  '<td style="width:50px;"><a href="' + info.url + '" target="_blank">' + info.name + '</td>' +
  '<td class="center ' + info.name.toLowerCase() + '">' + info.status + '</td></tr>';
  $('#results').append( html );
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

