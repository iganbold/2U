// chrome.runtime.onMessage.addListener(function(request, sender) {
//   if( request.message == "show_fab" ) {
//     // console.log("show_fab");
//     // chrome.tabs.create({"url": request.url});
//     chrome.tabs.sendMessage(sender.tab.id, request.message);
//   } else if(request.message == "hide_popup") {
//     chrome.tabs.sendMessage(sender.tab.id, request.message);
//   }
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.sendMessage(sender.tab.id, request);

    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    // if (request.greeting == "hello")
    //   sendResponse({farewell: "goodbye"});
  });
