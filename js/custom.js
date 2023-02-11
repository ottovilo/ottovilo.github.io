/* custom.js for Devkit */
$(function () {
  $(".misa").css({'display': 'none', 'visibility': 'hidden'});
  /*$('.mobile-icon').click(function () {
   $('nav ul').toggleClass("showing");
   });*/
});

//var lastScrollTop = 0;

$(window).scroll(function() {
    if ($(this).scrollTop() > 50){  
	$('header').addClass("scroll");
	$('#main-menu').addClass("scroll");
        
        //$('#brandlogo').attr("src","images/xxx.png");
	
    }
    else {
        $('header').removeClass("scroll");
        $('#main-menu').removeClass("scroll");

        //$('#brandlogo').attr("src","images/xxx.png");
    }
    
    /*
   var st = window.pageYOffset || document.documentElement.scrollTop;
   if (st > lastScrollTop && $(this).scrollTop() > 250){
      $('header').addClass("up");
   } else {
      $('header').removeClass("up");
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    */
});

$("a.fancybox").fancybox({
  speedIn: 600,
  speedOut: 200,
  overlayShow: false,
  autoScale: true,
});

document.addEventListener('click', function(e) {
    
  if (e.target.closest('button') != null) {
    if (!e.target.closest('button').classList.contains('show-some-button')) {
        const some_share_buttons_container = document.querySelector('.social-sharing-btns.showing');
        if (some_share_buttons_container) {
            some_share_buttons_container.classList.remove('showing');
        }
    }
  } else {
      console.log('button null');
  }   
});

document.addEventListener("DOMContentLoaded", function (event) {
    
  // some share
  const some_share_button = document.querySelector('.show-some-button');
  const some_share_buttons_container = document.querySelector('.social-sharing-btns');
  if (some_share_button && some_share_buttons_container) {
    
      some_share_button.addEventListener("click", function() { 
        if (some_share_buttons_container.classList.contains('showing')) {
            some_share_buttons_container.classList.remove('showing');
        } else {
            some_share_buttons_container.classList.add('showing');
        }
        // $('.social-sharing-btns').not($('.social-sharing-btns')).removeClass('showing')
		    // $('.social-sharing-btns').toggleClass('showing');
     });
  }
    
  // Uses sharer.js
  //  https://ellisonleao.github.io/sharer.js/#twitter
  var url = window.location.href;
  var title = document.title;
  var subject = "Read this good article";
  var via = "bootstrapC";
  console.log(url);
  console.log(title);

  //facebook
  $("#share-fb")
          .attr("data-url", url)
          .attr("data-sharer", "facebook");
  //twitter
  $("#share-tw")
          .attr("data-url", url)
          .attr("data-title", title)
          .attr("data-via", via)
          .attr("data-sharer", "twitter");
  //linkedin
  $("#share-li")
          .attr("data-url", url)
          .attr("data-sharer", "linkedin");
  // google plus
  $("#share-gp")
          .attr("data-url", url)
          .attr("data-title", title)
          .attr("data-sharer", "googleplus");
  // email
  $("#share-em")
          .attr("data-url", url)
          .attr("data-title", title)
          .attr("data-subject", subject)
          .attr("data-sharer", "email");

  //Prevent basic click behavior
  $(".sharer button").click(function () {
    event.preventDefault();
  });
});

$(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({scrollTop: (target.offset().top - 100)}, 1000);
          return false;
        }
      }
    });
  });


// external js: isotope.pkgd.js
// init first imagesLoaded, then Isotope

var $grid = $('.grid-isotope').imagesLoaded( function() {
var $grid = $('.grid-isotope').isotope({
  itemSelector: '.grid-item',
   layoutMode: 'fitRows',
  transitionDuration: 650,
  // stagger: 30
});
// filter functions, DO NOT REMOVE!
var filterFns = {
};

// bind filter button click
$('.filters-button-group').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});
// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

});

// SmartMenus init
$(function() {
  $('#main-menu').smartmenus({
    showOnClick: true,		// show the first-level sub menus onclick instead of onmouseover (i.e. mimic desktop app menus) (matters only for mouse input)
    hideOnClick: true,		// hide the sub menus on click/tap anywhere on the page
    noMouseOver: true
  });
});

/*** GENERAL START ***/
function loadMore(that, offset, elem, limit, category, lang) {
    
  var el = $(that);
  /*el.closest('.js-news-cats').find('li').each(function(i){
    $(this).removeClass('active');
  });
  el.closest('li').addClass('active');*/
  if (sessionStorage.getItem('load-offset')) {
    if (offset == 0) {
      sessionStorage.setItem('load-offset', 0)
    }
    var offset_before = parseInt(sessionStorage.getItem('load-offset'));
  } else {
    var offset_before = 0;
  }
  var new_offset = offset + offset_before;
  sessionStorage.setItem('load-offset', new_offset)

  const data = {
    offset: new_offset,
    limit: limit,
    category: category,
    lang: lang
  };

  const params = encodeQueryData(data);
  const callbackArgs = [elem, limit, offset];
  const responseType = 'html';
  httpRequestHandler('get', 'ajax/ajax-load-more/', params, responseType, appendContent, callbackArgs);
}

function encodeQueryData(data) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

var xmlHttp = null;
function httpRequestHandler(method, url, params, responseType, callbackFunction, callbackArgs, multipleRequestAllowed) {
  if (method == 'post') {
  var paramsSend = params;
  var paramsGet = '';
  } else {
  var paramsSend = null;
  var paramsGet = '?' + params;
  }

  if (multipleRequestAllowed == true) {
      var xmlHttp = null;
  }

  if (xmlHttp != null) {
      xmlHttp.abort();
  } else {
      if (document.getElementById('ajax-loader')) {
        if (document.getElementById('ajax-loader').style.display == 'none') {
          var loader = setTimeout(startLoader, 2000);
        }
      }
  }

  xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          if (loader) {
            stopLoader(loader);
          }
          var response = xmlHttp.responseText;
          if (xmlHttp.responseText !== '') {
              if (responseType === 'json') {
                  response = JSON.parse(xmlHttp.responseText);
              }
          }

          if (callbackFunction) {
              callbackFunction(...callbackArgs, response);
          }
      }
  }
  xmlHttp.open(method, url + paramsGet);
  xmlHttp.setRequestHeader('Cache-Control', 'no-cache');
  xmlHttp.send(paramsSend);
}

function appendContent(elem, limit, offset, requestResponse) {
  if (offset == 0) {
    document.getElementById(elem).innerHTML = '';
  }
  console.log(elem);
  document.getElementById(elem).insertAdjacentHTML("beforeend", requestResponse);
  var parseContent = document.createElement("div");
  parseContent.innerHTML = requestResponse;
  const lastLoadMore = Array.from(document.getElementById(elem).getElementsByClassName('loadMoreButtonJS')).pop();
  console.log(lastLoadMore);
  Array.from(document.getElementById(elem).getElementsByClassName('loadMoreButtonJS')).forEach(hideMe);
  if (parseContent.querySelector('#total_count')) {
    var itemsTotalCount = parseContent.querySelector('#total_count').value;
    var listed_items = parseInt(sessionStorage.getItem('load-offset')) + limit;
    if (listed_items < itemsTotalCount) {
      lastLoadMore.style.display = 'block';
    }
  }
}


function hideMe(el) {
  el.style.display = 'none';
}

function showAjaxContent(elementDOMID, innerHTMLData) {
  if (elementDOMID) {
    document.getElementById(elementDOMID).innerHTML = innerHTMLData;
  }
}
function startLoader() {
  document.getElementById('ajax-loader').innerHTML = '<img src="ikonit/loader-200.gif">';
  document.getElementById('ajax-loader').style.display = 'block';
}

function stopLoader(interval) {
  document.getElementById('ajax-loader').innerHTML = '';
  document.getElementById('ajax-loader').style.display = 'none';
  clearTimeout(interval);
}

function showMessage(message, message_class, delay) {
  delay = (delay > 0) ? delay : 2000;
  var messageBox = document.getElementById('messageBox');
  messageBox.innerHTML = message;
  messageBox.classList.remove('fadeout');
  messageBox.classList.add(message_class);
  messageBox.classList.add('fade');

  setTimeout(function () {
  messageBox.classList.remove('fade');
  messageBox.classList.add('fadeout');
  }, delay);
}

/*** GENERAL END ***/