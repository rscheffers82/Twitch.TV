// Javascript
$( document ).ready(function() {
  getResults (channels);
});

/*
Usage details see the below link: 
https://github.com/justintv/Twitch-API/blob/master/v3_resources/streams.md#get-streamschannel
*/
var url = "https://api.twitch.tv/kraken/";
var channels = ["blackbeltproofreader",
               "brunofin",
               "nalcs1",
               "OgamingSC2",
               "storbeck",
               "comster404",
               "cretetion",
               "ESL_SC2",
               "habathcx",
               "RobotCaleb",
               "noobs2ninjas",
               "dawah200",
               "esportsarena",
               "summit1g",
               "nl_kripp"];
// CodePen usage
//var $NO_IMG = 'https://github.com/rscheffers82/TwitchTV/raw/master/images/no-channel.jpg';
// GitHub / local usage
 var $NO_IMG = 'images/no-channel.jpg';

var getResults = function (twData) {
  // check if the array is still containing elements
  if ( twData.length < 1 ) return;
  
  // take the first element of the array 
  var currentChannel = twData.shift();
  
  // API call to get the twitch channel info
  $.getJSON(url + "channels/" + encodeURI(currentChannel))
    .done(function(data, textStatus, jqXHR) {
      var info = {};
      info.logo = data.logo
      info.name = data.display_name;
      info.url = data.url;
      
      // 2nd API call to check if the channel is streaming content
      $.getJSON(url + "streams/" + encodeURI(currentChannel))
        .done(function(data){
          if ( data.stream !== null ){
              info.online = true;
              info.status = data.stream.channel.status;
          } else {
            info.online = false;
            info.status = 'Offline';
          }
          // once data is gathered, display them and invoke getResults again for the next channel
          display(info);
          getResults(twData);
        });
  })
  
  .fail(function(jqXHR, textStatus, errorThrown) {
    // account closed or not found error handling
    //console.log('failed to find the name' + errorThrown.toString());
    //console.log(jqXHR);
    var info = {};
    info.logo = $NO_IMG
    info.name = jqXHR.responseJSON.message.split('\'')[1];
    info.status = 'Account Closed';
    info.url = '#';
    info.online = false;
    // once failure data is gathered, display them and invoke getResults again for the next channel
    display(info);
    getResults(twData);
  })
}

var display = function(info){
  // format the data in a html table
  var html = '';
  
    html += '<div class="channel">';
      html += '<div class="logo ' + (info.online ? 'online' : 'offline') + '"><img class="ico" src="' + info.logo + '"></div>';
      html += '<div class="name ' + (info.online ? 'online' : 'offline') + '"><a href="' + info.url + '" target="_blank">' + info.name + '</div>';
      html += '<div class="status ' + (info.online ? 'online' : 'offline') + '">' + info.status + '</div>';
    html += '</div>';

  info.online ? $('#results').prepend( html ) : $('#results').append( html );
}