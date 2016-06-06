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


var channel = ["brunofin", "comster404", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "dawah200", "esportsarena", "summit1g", "nl_kripp"];
var twData = [{
            "channel": "brunofin"
            },
            {
            "channel": "ESL_SC2"  
            }
            
            ];
/*
var url = "https://api.twitch.tv/kraken/";

for ( var select in data ){
  // console.log(data[select]);
  $.getJSON(url + "channels/" + data[select].channel)
    .done(function(data, textStatus, jqXHR) {
      console.log("done: " + data[select].channel);
      console.log(data); 
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("fail: " + textStatus);
      console.log(errorThrown.toString());
    })
    
 // $.getJSON(url + "streams/" + data[select].channel, function(data){
 //   console.log(data);
//  });
}
*/
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

$('#results').prepend( $('#freecodecamp') );