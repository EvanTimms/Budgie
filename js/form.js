//adding listen to form and retrieving data when form is submitted
document.getElementById('form').addEventListener("submit", function(){
    // TODO: use submitted date version
    // export form variables to use in main.js
    var form = document.getElementById('form');

    var allowance = form.elements[0].value;
    if(allowance == null){
        allowance = "0";
    }else{
        allowance = String(allowance);
    }

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

    //checking if current date is to be used
    var useCurrentDate = form.elements[5].checked;
    

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