
//code to pull purchase history from chrome storage
let purchaseList = document.getElementById('history');

function appendToList(obj){
    //create new li
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(obj.amount + ' : ' + obj.description));
    li.style.whiteSpace = 'nowrap';
    purchaseList.appendChild(li);
}

//load purchase list
chrome.storage.local.get(['PURCHASES'], function(result){
    for(var i = 0; i < result.PURCHASES.length; ++i){
        appendToList(result.PURCHASES[i]);
    }
});
