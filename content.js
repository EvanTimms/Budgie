//grab current url and pass to background script

var curr_url;

function getUrl(callBack){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        curr_url = tabs[0].url;
    });
}

console.log(curr_url);

//sending to background script

chrome.runtime.sendMessage({url: curr_url}, function(response){
    console.log(response);
});

