//message event handler
chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        console.log(request);
    }
)