//CONSTANTS FOR DATABASE
const ACCOUNTS = [];
const PURCHASES = [];
const FORMRESULTS = {
    exists: false,
    amount: 0,
    resetInterval: 2,//monthly as default
    resetDate: ""
};


//log in state
var ISLOGGEDIN = false;

function setPermissions(state){

}

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
        chrome.storage.local.set({PURCHASES:PURCHASES}, function(err){
            if(err){
                console.log(err);
            }
        });
        //save empty budget
        chrome.storage.local.set({FORMRESULTS:FORMRESULTS}, function(err){
            if(err){
                console.log(err);
            }
        });

        chrome.storage.local.set({ACCOUNTS:ACCOUNTS}, function(err){
            if(err){
                console.log(err);
            }
        });
    }
});


//MESSAGING LISTENER
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(chrome.runtime.lastError){
        console.log(chrome.runtime.lastError.string);
        sendResponse({message: "failure"});
    } else if(request.type == "logout-request"){
        ISLOGGEDIN = false;
        sendResponse({message: "success"});
    } else if(request.type == "login-request"){
        ISLOGGEDIN = true;
        sendResponse({message:"success"});
    }else{
        console.log("Uknown Error: runtime event handler cannot determine");
        sendResponse({message:"failure"});
    }
    console.log(ISLOGGEDIN);
    setPermissions(ISLOGGEDIN);
});
