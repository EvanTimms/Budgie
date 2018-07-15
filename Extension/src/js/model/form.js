class formResults{
    constructor(exists,amount,resetInterval,resetDate){
        this.exists = exists;
        this.amount = amount;
        this.resetInterval = resetInterval;
        this.resetDate = resetDate;
    }

    returnObj(){
        let obj = {
            exists: this.exists,
            amount: this.amount,
            resetInterval: this.resetInterval,
            resetDate: this.resetDate
        }
        return obj;
    }
    
}
// import {formResults} from "/classes.js";

function loadData(){
    let form = document.getElementById('form');

    //loading from storage
    chrome.storage.local.get(['FORMRESULTS'], function(result){
        //if user has not entered a budget yet, will redirect to main.html
        if(!result.FORMRESULTS.exists){
            window.location.replace(window.location.href.replace('edit.html', 'main.html'));
        }else{

            //loading monthly amount
            form.elements[0].value = result.FORMRESULTS.amount;
            
            //loading reset interval
            switch(result.FORMRESULTS.resetInterval){
                case 0:
                    form.elements[1].checked = true;
                    break;
                case 1:
                    form.elements[2].checked = true;
                    break;
                case 2:
                    form.elements[3].checked = true;
                    break;
                case 3:
                    form.elements[4].checked = true;
                    break;
                default:
                    form.elements[2].checked = true;
                    console.log("Error in assigning reset interval");
            }

            //loading reset date information
            form.elements[5].checked = false;
            form.elements[6].value = result.FORMRESULTS.resetDate;
        }
        
    });

}

//If on the edit page, pull data from storage
if(window.location.href.includes('edit.html')){
    console.log('Editing');
    loadData();
}


//adding listen to form and retrieving data when form is submitted
document.getElementById('form').addEventListener("submit", function(){
    //form results

    let form = document.getElementById('form');
    //saving amount
    let amount = (form.elements[0].value == null) ? 0 : form.elements[0].value;

    //checking too see which value was selected
    let resetInterval;
    if(form.elements[1].checked){
        resetInterval = 0;//weekly
    }else if(form.elements[2].checked){
        resetInterval = 1; //biweekly
    }else if(form.elements[3].checked){
        resetInterval = 2; //monthly
    }else if(form.elements[4].checked){
        resetInterval = 3; //yearly
    }else{
        console.log("Nothing Selected(NEW FORM)");
    }

    let resetDate;
    //checking if current date is to be used
    if(form.elements[5].checked){
        //generating date using Date class
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        resetDate = yyyy + '-' + mm + '-' + dd;

    }else{
        resetDate = form.elements[6].value;
    }

    let exists = true;
    chrome.storage.local.set({FORMRESULTS:new formResults(exists,amount,resetInterval,resetDate).returnObj()}, function(err){
        if(err){
            console.log(err);
        }
    });

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