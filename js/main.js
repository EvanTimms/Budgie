//Placeholder for dynamic stuff later
let fundsRemaining = document.getElementById("fundsRemaining");
let daysRemaining = document.getElementById("daysRemaining");
let resetInterval = document.getElementById("resetInterval");
let resetDate = document.getElementById("resetDate");
const NUMTODAY = {
    0 : "weekly",
    1 : "bi-weekly",
    2 : "monthly",
    3 : "yearly"
}


//function to calculate days remaining till budget reset
function calculateDaysLeft(str){
    //get current date
    let today = new Date();

    let mdy = str.split('-');
    
    if(mdy[1][0] == 0){
        mdy[1] = mdy[1][1];
    }

    if(mdy[0][0] == 0){
        mdy[0] = mdy[0][1];
    }

    let deadline = new Date(mdy[0],mdy[1]-1,mdy[2]);
    let diff = deadline.getTime()-today.getTime();
    let days = Math.floor(diff/(1000*60*60*24));
    return days + 1;
}

//loading data from storage
chrome.storage.local.get(['FORMRESULTS'], function(result){
    if(result.FORMRESULTS.exists){
        fundsRemaining.textContent = result.FORMRESULTS.amount;
        resetInterval.textContent = NUMTODAY[result.FORMRESULTS.resetInterval];
        resetDate.textContent = result.FORMRESULTS.resetDate;
        daysRemaining.textContent =  calculateDaysLeft(result.FORMRESULTS.resetDate);
    }
});

//listener for newPurchase form
document.getElementById('newPurchase').addEventListener('submit', function(){
    let des = this.elements[0].value;
    let amount = this.elements[1].value;
    let obj = {
        'description' : des,
        'amount' : amount
    };

    //subtracting from current budget
    chrome.storage.local.get(['FORMRESULTS'], function(result){
        result.FORMRESULTS.amount -= obj.amount;
        //updating
        chrome.storage.local.set({FORMRESULTS:result.FORMRESULTS}, function(err){
            if(err){
                console.log(err);
            }
        });
    });


    //get purchase list from storage
    chrome.storage.local.get(['PURCHASES'], function(result){
        //adding new purchase
        result.PURCHASES.push(obj);
        //saving to data storage
        chrome.storage.local.set({PURCHASES:result.PURCHASES},function(err){
            if(err){
                console.log(err);
            }
        });
    });
});

//listener for logout form
document.getElementById('logout').addEventListener('click', ()=>{
    chrome.runtime.sendMessage({type: "logout-request"}, (response)=>{
        console.log(response.message);
        if(response.message == "failure"){
            console.log("Logout Failed");
        }
    });
});