// USER MODEL
class User{
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    returnObj(){
        let obj = {
            username: this.username,
            password: this.password,
            email: this.email
        }
        return obj;
    }
}


document.getElementById('signup').addEventListener('submit', ()=>{
    let form = document.getElementById('signup');
    let newUser = new User(form.elements[0].value, form.elements[1].value, form.elements[2].value);
    // console.log(newUser.returnObj().username + ' : ' + newUser.returnObj().password);
    let taken = false;
    //Pull accounts from storage
    chrome.storage.local.get(['ACCOUNTS'], (results)=>{
        //TODO: Replace with more efficient algorithm for checking if username is taken
        if(!(results.ACCOUNTS == undefined)){
            for(let i = 0; i < results.ACCOUNTS.length; ++i){
                if(results.ACCOUNTS[i].username == newUser.username){
                    console.log('Username Already Exists');
                    taken = true;
                    break;
                }
            }
            if(!taken){
                //add new user and save
                console.log('account added');
                results.ACCOUNTS.push(newUser.returnObj());
                chrome.storage.local.set({ACCOUNTS:results.ACCOUNTS}, (err)=>{
                    if(err){
                        console.log(err);
                    }
                });
            }
        }

    });
});