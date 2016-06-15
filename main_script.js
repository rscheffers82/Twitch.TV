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
var twData = [//{
            //"channel": "brunofin"
            //},
            {
            "channel": "freecodecamp"  
            }
            
            ];

var url = "https://api.twitch.tv/kraken/";

$(.add).append('<table id="results" class="table table-hover">');

for ( var select in twData ){
  // console.log(data[select]);
  $.getJSON(url + "channels/" + twData[select].channel)
    .done(function(data, textStatus, jqXHR) {
      var info = [];
      info.logo = data.logo
      info.name = data.display_name;
      info.status = data.status;
      info.url = data.url;
      info.online = 'online';
      //console.log(data);
      display(info);

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      // account closed or not found error handling
      if ( jqXHR.status === 404 ) {
        var info = [];
        info.logo = 'images/no-channel.jpg';
        info.name = jqXHR.responseJSON.message.split('\'')[1];
        info.status = 'Account not found';
        info.url = '#';
        info.online = 'offline';
        //console.log("fail: " + textStatus);
        //console.log(errorThrown.toString());
        console.log(jqXHR.responseJSON.message);
        display(info);
      }
      // display different errors when they are triggered
      else console.log('different than 404: ' + errorThrown.toString());
    })
    /* not needed
    $.getJSON(url + "streams/" + twData[select].channel, function(data){
     console.log(data);
      console.log(data.stream.channel.status);
    });
    */
}

$(.add).append('</table>');

function display(info){
  console.log(info);
  var html = '';
  html += '<tr class="' + info.online + '"><td style="width:50px;">' +
  '<img class="ico" src="' + info.logo + '"></td>' +
  '<td style="width:50px;"><a href="' + info.url + '" target="_blank">' + info.name + '</td>' +
  '<td class="center">' + info.status + '</td></tr>';
}

$('#results').prepend( $('.online') );

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

