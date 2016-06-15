$(document).ready(function() {

  var q = '';
  var numArticles = 5;
  var random = false;

  // URL for Wikipedia API endpoint
  var URL_Wiki = 'https://en.wikipedia.org/w/api.php?callback=?';

  // retrieve Articles
  var timer;
  var x;

  $("#searchterm").keyup(function(e) {
    q = $("#searchterm").val();
    random = false;
    if (x) {
      x.abort()
    } // If there is an existing XHR, abort it.
    clearTimeout(timer); // Clear the timer so we don't end up with duplicates.
    timer = setTimeout(function() { // assign timer a new timeout
      x = getArticle(q, numArticles); // run request and store in x variable (so we can cancel)
    }, 750); // ms delay, tweak for faster/slower

  });

  function getArticle(q, num) {
    $("#results").empty();
    if (random) {
      thumbnail = 210;
    } else {
      thumbnail = 100;
    }

    var parameters = {
      search: q,
      action: "opensearch",
      list: "search",
      format: "json",
      limit: num
    };

    $.getJSON(URL_Wiki, parameters)
      .done(function(data, textStatus, jqXHR) {

        $.each(data[1], function(i) {
          var page = {};
          page.url = data[3][i];
          page.name = data[1][i];
          page.brief = data[2][i];

          var parameters = {
            action: "query",
            prop: "pageimages",
            piprop: "thumbnail",
            pithumbsize: thumbnail,
            pilimit: 1,
            titles: page.name,
            format: "json"
          };

          $.getJSON(URL_Wiki, parameters)
            .done(function(data, textStatus, jqXHR) {

              var key = Object.keys(data.query.pages);
              if (data.query.pages[key[0]].thumbnail !== undefined) {
                page.pic = data.query.pages[key[0]].thumbnail.source;
              } else {
                page.pic = null;
              }

              pageItem(page);

            })
            .fail(function(jqXHR, textStatus, errorThrown) {
              console.log(errorThrown.toString());
            })
        });
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown.toString());
      })
  };

  // retrieve RANDOM Article
  function getRandom() {
    var parameters = {
      action: "query",
      list: "random",
      format: "json",
      rnnamespace: 0,
      rnlimit: 1
    };
    $.getJSON(URL_Wiki, parameters)
      .done(function(data, textStatus, jqXHR) {
        getArticle(data.query.random[0].title, 1);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown.toString());
      })
  };

  function pageItem(aPage) {
    var html = '';

    html += '<a class="media-object" href="' + aPage.url + '" target="_blank"><li class="media list-group-item">';
    html += '<div class="media-left media-top">';
    html += '<div class="frame-square">';
    html += '<div class="crop">';
    if (aPage.pic !== null) {
      html += '<img class="clean" src="' + aPage.pic + '" alt="">';
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="media-body">';
    html += '<ul class="media-text">';
    html += '<li><h4 class="media-heading">' + aPage.name + '</h4></li>';
    html += '<li class="small">' + aPage.brief + '</li>';
    html += '</ul>';
    html += '</div>';
    html += '</li></a>';

    $("#results").append(html);
    if (random) {
      $('.frame-square').css({
        width: 150,
        height: 150
      });
    } else {
      $('.frame-square').css({
        width: 90,
        height: 90
      });
    }
    $("h4").highlight(q);
  };

  $(".hasclear").keyup(function() {
    var t = $(this);
    t.next('span').toggle(Boolean(t.val()));
  });

  $(".clear").hide($(this).prev('input').val());

  $(".clear").click(function() {
    $(this).prev('input').val('').focus();
    $(this).hide();
    $("#results").empty();
  });

  $("#randomSelectionBTN").click(function() {
    $("#searchterm").val('');
    $("#results").empty();
    random = true;
    getRandom();
  });

  jQuery.extend({
    highlight: function(node, re, nodeName, className) {
      if (node.nodeType === 3) {
        var match = node.data.match(re);
        if (match) {
          var highlight = document.createElement(nodeName || 'span');
          highlight.className = className || 'highlight';
          var wordNode = node.splitText(match.index);
          wordNode.splitText(match[0].length);
          var wordClone = wordNode.cloneNode(true);
          highlight.appendChild(wordClone);
          wordNode.parentNode.replaceChild(highlight, wordNode);
          return 1; //skip added node in parent
        }
      } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
        !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
        !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
        for (var i = 0; i < node.childNodes.length; i++) {
          i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
        }
      }
      return 0;
    }
  });

  jQuery.fn.unhighlight = function(options) {
    var settings = {
      className: 'highlight',
      element: 'span'
    };
    jQuery.extend(settings, options);

    return this.find(settings.element + "." + settings.className).each(function() {
      var parent = this.parentNode;
      parent.replaceChild(this.firstChild, this);
      parent.normalize();
    }).end();
  };

  jQuery.fn.highlight = function(words, options) {
    var settings = {
      className: 'highlight',
      element: 'span',
      caseSensitive: false,
      wordsOnly: false
    };
    jQuery.extend(settings, options);

    if (words.constructor === String) {
      words = [words];
    }
    words = jQuery.grep(words, function(word, i) {
      return word != '';
    });
    words = jQuery.map(words, function(word, i) {
      return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    });
    if (words.length == 0) {
      return this;
    };

    var flag = settings.caseSensitive ? "" : "i";
    var pattern = "(" + words.join("|") + ")";
    if (settings.wordsOnly) {
      pattern = "\\b" + pattern + "\\b";
    }
    var re = new RegExp(pattern, flag);

    return this.each(function() {
      jQuery.highlight(this, re, settings.element, settings.className);
    });
  };

});