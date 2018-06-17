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

        //adding blank purchase list
        //save purchases in description/amount format
        let PURCHASES = [];
        chrome.storage.local.set({PURCHASES:PURCHASES}, function(err){
            if(err){
                console.log(err);
            }
        });
    }
});

// //startup listener
// chrome.runtime.onStartup.addListener(function(){
//     console.log('starting')
// });