//Placeholder for dynamic stuff later
const fundsRemaining = document.getElementById("fundsRemaining");
const daysRemaining = document.getElementById("daysRemaining");
const resetInterval = document.getElementById("resetInterval");

chrome.storage.local.get(['formResults'], function(result){
    if(result.formResults != undefined){
        fundsRemaining.textContent = result.formResults.amount;
        resetInterval.textContent = result.formResults.resetInterval;
        daysRemaining.textContent = result.formResults.resetDate;
    }
});


