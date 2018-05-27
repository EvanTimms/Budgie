//adding listen to form and retrieving data when form is submitted
document.getElementById('form').addEventListener("submit", function(){
    //form results
    var formResults = {
        amount: "",
        resetInterval: "",
        resetDate: ""
    };

    var form = document.getElementById('form');

    var allowance = form.elements[0].value;
    if(allowance == null){
        allowance = "0";
    }else{
        allowance = String(allowance);
    }
    //saving to obj
    formResults.amount = allowance;

    //checking too see which value was selected
    var checkedButton;
    if(form.elements[1].checked){
        checkedButton = "weekly";
    }else if(form.elements[2].checked){
        checkedButton = "biweekly";
    }else if(form.elements[3].checked){
        checkedButton = "monthly";
    }else if(form.elements[4].checked){
        checkedButton = "yearly";
    }else{
        console.log("Nothing Selected(NEW FORM)");
    }
    formResults.resetInterval = checkedButton;

    //checking if current date is to be used
    var useCurrentDate = form.elements[5].checked;
    if(useCurrentDate){
        formResults.resetDate = "usecurr";
    }else{
        formResults.resetDate = form.elements[6].value;
    }

    //TODO: Pass to background page
    chrome.runtime.sendMessage({greeting: "sending results"}, formResults, function(response){
        console.log(response.farewell);
    })
});

//added listener to cross out date selection if checkbox selected
document.getElementById("setOption1").addEventListener("click", function(){
    var dateOption = document.getElementById("setOption2");
    if(dateOption.style.display === "none"){
        dateOption.style.display = "block";
    }else{
        dateOption.style.display = "none";
    }
});

