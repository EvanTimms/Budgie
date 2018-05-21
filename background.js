chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension Installed");
  });

// added listener for content script message

chrome.runtime.onMessage.addListener(
  function(request,sender, sendResponse){
    console.log("messaged received");
});