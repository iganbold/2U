var iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL("fabbtn.html");
iframe.className = 'tou-fab';
iframe.frameBorder = 0;
document.body.appendChild(iframe);

var grades = ["A","B","C","D","E"];

var touLinks = [
  {"url": "https://twitter.com/tos?lang=en", "rUrl": "twitter.json"},
  {"url": "https://www.google.com/intl/en/policies/terms/", "rUrl": "google.json"},
  {"url": "https://www.youtube.com/t/terms", "rUrl": "youtube.json"},
  {"url": "https://about.500px.com/about/terms/", "rUrl": "500px.json"},
  {"url": "https://pages.soundcloud.com/en/legal/terms-of-use.html", "rUrl": "soundcloud.json"},
  {"url": "https://help.github.com/articles/github-terms-of-service/", "rUrl": "github.json"},
  {"url": "http://www.delicious.com/terms", "rUrl": "delicious.json"},
  {"url": "https://kolabnow.com/privacy", "rUrl": "kolabnow.json"},
  {"url": "https://wikimediafoundation.org/wiki/Terms_of_Use", "rUrl": "wikipedia.json"},
  {"url": "https://cloudant.com/terms/", "rUrl": "cloudant.json"}
];

function checkUrl() {
  console.log(window.location.href);
  var count=0;
  for(;count<7;count++) {
    if(touLinks[count].url == window.location.href) {
      return touLinks[count].rUrl;
    }
  }

  return false;
}

var tosdrAPIURL = "https://tosdr.org/api/1/service/";

function sendTOSRequest(result) {
  console.log("Sending request to:"+ tosdrAPIURL+result);
  $.getJSON(tosdrAPIURL+result).done(function(data) {
    return chrome.runtime.sendMessage({"message": "test_popup", "data": data});
    // return alert(JSON.stringify(data));
    // return console.log(JSON.stringify(data));
  });
}

function autoSendTOSRequest(result) {
  console.log("Sending request to:"+ tosdrAPIURL+result);
  $.getJSON(tosdrAPIURL+result).done(function(data) {
    return chrome.runtime.sendMessage({"message": "fab_color_change", "data": data});
  });
}


var autoResult = checkUrl();
if(autoResult)
  autoSendTOSRequest(autoResult);

chrome.runtime.onMessage.addListener(function(req) {
  if (req.message == 'hide_popup') {
    iframe.style.width = "0%";
    iframe.style.height = "0%";
  }

  if (req.message == 'ajax_tos') {
    console.log("ajax log");
    var result = checkUrl();
    if(result)
      sendTOSRequest(result);
  }
});

var touList = ["Terms of Service","terms of service","Terms of Use","terms of uervice","Terms and Conditions","terms and conditions"];
var i=0;
for(;i<6;i++){
  var found = $('*:contains('+touList[i]+')').length > 0;
  if(found) {
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    console.log("Found");
    // var firstHref = $("a[href^='http']").eq(0).attr("href");
    // chrome.runtime.sendMessage({"message": "show_popup", "url": firstHref});
    break;
  }
}
