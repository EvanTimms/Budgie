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
    // console.log(days);
    return days;
}


chrome.storage.local.get(['formResults'], function(result){
    if(result.formResults != undefined){
        fundsRemaining.textContent = result.formResults.amount;
        resetInterval.textContent = NUMTODAY[result.formResults.resetInterval];
        resetDate.textContent = result.formResults.resetDate;
        daysRemaining.textContent =  calculateDaysLeft(result.formResults.resetDate);
    }
});


