//installation listener
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log('this is first install');
    }else if(details.reason == 'update'){
        let thisVersion = chrome.runtime.getManifest().version;
        if(details.previousVersion != thisVersion){
            console.log("Updated from " + details.previousVersion + " to " + thisVersion);
        }else{
            console.log("Running version " + thisVersion);
        }
    
    }
});


//MESSAGING LISTENER
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){

});
