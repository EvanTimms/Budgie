// changes class to allow toggling of navbar in mobile mode and when 
//loaded as chrome extension
function parseNewPurchase(){
    //TODO: Implement error handling code

    let form = document.querySelector('.Purchase-Form');
    let currentDate = new Date();
    let userInput = {
        description: form.elements[0].value,
        amount: form.elements[1].value,
        transaction_dd: currentDate.getDate(),
        transaction_mm: currentDate.getMonth(),
        transaction_yyyy: currentDate.getFullYear()
    };

    
    fetch(new Request('user/73298dhabc712hd6'), {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInput)
    })
    .then((response)=>{
        if(response.ok){
            return response.json();
        }
    })
    .then((data)=>{
        console.log(data);
    })
    .catch((e)=> console.log(e));


    //fetching new user data
    fetch(new Request('user'))
    .then((response)=>{
        if(response.ok){
            return response.json();
        }
    })
    .then((data)=>{
        loadData(data);
    })
    .catch((e)=> console.log(e));
}




// INITALIZATION FUNCTIONS
function loadPie(data){


    // Function for loading of the main pie chart
    let chart = new CanvasJS.Chart("pieChartContainer", {
        animationEnabled: true,
        data : [{
            type: "doughnut",
            startAngle: 270,
            indexLabelFontSize: 17,
            indexLabel: "{label}",
            toolTipContent: "<b>{label}:</b> ${y}",
            dataPoints: [
                { y: data.budget.remaining_amount, label: "Remaining Funds" },
                { y: data.budget.spent_amount, label: "Spent Funds" }
            ]
        }]
    });

    chart.render();
    //removing credit cus i dont care bout them
    document.querySelector('.canvasjs-chart-credit').remove();
}

function calcAverage(arr){
    // each array element contains an object w/ description
    let sums = [];
    arr.forEach((el)=>{
        sums.push(el.amount);
    });
    return sums.reduce((acc, curr)=> acc+curr)/sums.length;
}

function getDataPoints(arr){
    let points = [];
    arr.forEach((el)=>{
        points.push({
            x : new Date(`${el.transaction_date}`),
            y : el.amount
        });
    });

    return points;
}

function loadHistoryChart(data){


    //Function for loading and displaying the history line chart
    let chart = new CanvasJS.Chart("historyChartContainer", {
        animationEnabled: true,  
        title:{
            text: "Purchase History"
        },
        axisY: {
            title: "Spent",
            valueFormatString: "#0 ,,.",
            suffix: "CAD",
            stripLines: [{
                value: calcAverage(data.budget.history),
                label: "Average"
            }]
        },
        data: [{
            yValueFormatString: "$####",
            xValueFormatString: "YYYY MM DD",
            type: "spline",
            dataPoints: getDataPoints(data.budget.history)
        }]
    });
    chart.render();
    //removing credit cus i dont care bout them
    document.querySelector('.canvasjs-chart-credit').remove();
}


function loadCurrentDate(){

    let days = {
        0:'Sunday',
        1:'Monday',
        2:'Tuesday',
        3:'Wedensday',
        4:'Thursday',
        5:'Friday',
        6:'Saturday'    }

    let months = {
        0:'January',
        1:'Febuary',
        2:'March',
        3:'April',
        4:'May',
        5:'June',
        6:'July',
        7:'August',
        8:'September',
        9:'October',         
        10:'November', 
        11:'December'     }


    let day = document.querySelector('.Date-Day'),
        month = document.querySelector('.Date-Month'),
        day_number = document.querySelector('.Date-Number'),
        year = document.querySelector('.Date-Year');

    currentDate = new Date();

    day.innerText = days[currentDate.getDay()];
    month.innerText = months[currentDate.getMonth()];
    day_number.innerText = currentDate.getDate();
    if(day_number.innerText === '1'){
        day_number.innerText += 'st'; 
    }else if(day_number.innerText === '2'){
        day_number.innerText +='nd';
    }else if(day_number.innerText === '3'){
        day_number.innerText +='rd';
    }else{
        day_number.innerText +='th';
    }
    year.innerText = currentDate.getFullYear();

}

function loadData(data){
    //Loading Username
    document.querySelector('#username')
    .innerText = data.username;

    //Loading Data
    loadCurrentDate();

    //Loading graphics
    loadPie(data);
    loadHistoryChart(data);

    //Loading Main Display
    document.querySelector('#Remaining')
    .innerText = data.budget.remaining_amount;
    document.querySelector('#Reset')
    .innerText = data.budget.reset_date;
    
}

function init(){
    //Initialization Function

    fetch(new Request('user'))
    .then((response)=>{
        if(response.ok){
            return response.json();
        }
    })
    .then((data)=>{
        console.log(data);
        // Initalizing user data
        loadData(data);
        let addBtn = document.querySelector('#addBtn');

        //Adding event listeners
        document.querySelector('#amount').addEventListener('keypress', (e)=>{
            let key = e.which || e.keyCode;
            if(key === 13){
                document.querySelector('.Purchase-Popup').classList.remove("Show");
                parseNewPurchase();
            }
        });   
        document.querySelector('#addBtn').addEventListener('click', function(){
            document.querySelector('.Purchase-Popup').classList.toggle("Show");
        });
        document.querySelector('.Navbar-Toggle').addEventListener('click', function(){
            let nav = document.querySelector('.Navbar-Items');
            nav.classList.toggle('Navbar-ToggleShow');
        });

    })
    .catch((e)=> console.log(e)); 
}

window.addEventListener('DOMContentLoaded', init);