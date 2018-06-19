//login listener
document.getElementById('login').addEventListener('submit', ()=>{
    let form = document.getElementById('login');
    //retrieve user list
    chrome.storage.local.get(['ACCOUNTS'], function(data){
        if(data.ACCOUNTS.length != 0){
            for(let i = 0; i < data.ACCOUNTS.length; ++i){
                if(data.ACCOUNTS[i].username == form.elements[0].value){
                    if(data.ACCOUNTS[i].password == form.elements[1].value){
                        //send message to background script
                        //TODO: Figure out why this callback does not fire
                        chrome.runtime.sendMessage({type: "login-request"}, (response)=>{
                            if(response.message == "failure"){
                                console.log("login failure");
                            }
                        });
                        window.location.replace(window.location.href.replace('login.html', 'main.html'));
                    }
                }
            }
        }else{
            console.log('No Accounts!');
        }
        
    });

});