$(function () {
  //TODOnext
  //optimoi..

  var gaProperty = 'G-BLPSYZ2CHW';
  //var fbProperty = 'XXX';
  disableGA = 'ga-disable-' + gaProperty;
  disableFB = 'fb-' + site;
});

function showCksModal() {
  setTimeout(function () {
    PopUp('cks');
  }, 500);
}

function PopUp(modal) {
  $('#' + modal).modal({backdrop: 'static', keyboard: false});
}
function chSettings(elem) {
  var el = $(elem);
  el.closest('#cks').find('.page1,.optoutAll,.accAll,.chSett').css('display', 'none');
  el.closest('#cks').find('.page2,.accCon,.chPage').css('display', 'inline-block');
}
function chPage(elem) {
  var el = $(elem);
  el.closest('#cks').find('.page1,.optoutAll,.accAll,.chSett').css('display', 'inline-block');
  el.closest('#cks').find('.page2,.accCon,.chPage').css('display', 'none');
}
function gaOptin() {
  document.cookie = disableGA + '=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window[disableGA] = false;
}
function gaOptout() {
  document.cookie = disableGA + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  window[disableGA] = true;
}
function fbOptin() {
  document.cookie = disableFB + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/;';
}
function fbOptout() {
  document.cookie = disableFB + '=false; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/;';
}

//vain google-cookiet
function setCookieDisableSite(site, val) {
  localStorage.setItem('disable-' + site, val);
}

function accAll(site) {
  setCookieDisableSite(site, '0');
  gaOptin();
  fbOptin();
  setCks(site);
  location.reload(true);
}

function accCon(elem, site) {
  var el = $(elem);
  var marketing = el.closest('#cks').find('input[name="marketing"]').is(':checked');
  var statistic = el.closest('#cks').find('input[name="statistic"]').is(':checked');
  if (statistic) {
    setCookieDisableSite(site, '0'); 
    gaOptin();
  } else {
    setCookieDisableSite(site, '1'); 
    gaOptout();
  }
  if (marketing) {
    fbOptin();
  } else {
    fbOptout();   
  }
  setCks(site);
  location.reload(true);
}

function optoutAll() {
  setCookieDisableSite(site, '1');
  gaOptout();
  fbOptout();
  setCks(site);
  location.reload(true);
}

function setCks(site) {
  var cksSession = [];
  var expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);//90pv
  var id = uuidv4();
  if (localStorage.getItem('cks-' + site)) {
    localStorage.removeItem('cks-' + site);
    cksSession = {expires: expires.toUTCString(), id: id};
    localStorage.setItem('cks-' + site, JSON.stringify(cksSession));
  } else {
    cksSession = {expires: expires.toUTCString(), id: id};
    localStorage.setItem('cks-' + site, JSON.stringify(cksSession));
  }
}

//palautus => false => popup
function chkCks() {
  //onko oltu sivulla
  if (localStorage.getItem('cks-' + site)) {
    //haetaan expire-ajankohta
    var expires = JSON.parse(localStorage.getItem('cks-' + site)).expires;
    if (new Date(expires) > new Date()) {
      return true;//voimassa => ei popuppia
    } else {
      return false;//expired..!! => popup!!
    }
    //ei olla oltu
  } else {
    return false;
  }
}

function chkGtag() {
  if (localStorage.getItem('disable-' + site) == null) {
    return false;
  } else if (localStorage.getItem('disable-' + site)) {
    var c = localStorage.getItem('disable-' + site);
    if (c == '1') {
      return false;
    } else {
      return true;
    }    
  } else {
    return true;
  }
}

function deleteCookie(name) {
  var cname = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    if (c.indexOf(cname) == 0) {
      document.cookie = cname + '; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
}

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0)
      return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
}