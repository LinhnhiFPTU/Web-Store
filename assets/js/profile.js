var usersAPI = "https://61b32a86af5ff70017ca1d02.mockapi.io/users";
function updateProfile(){
    var name = document.querySelector("#name").value;
    var phone = document.querySelector("#phone").value;
    var address = document.querySelector("#address").value;
    var email = document.querySelector("#email").value;
    var data = {
        fullname: name,
        phonenumber: phone,
        address: address,
        email: email
    };
    fetch(usersAPI+ '/' + localStorage.id,{
        method: 'PUT',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response=>{
        return response.json()
    })
    .then(data=> 
        alert("Successfully updated!"))
}
function changePass() { 
    var nowPass = document.querySelector("#pass-now").value;
    var newPass = document.querySelector("#pass-new").value;
    var confirmNewPass = document.querySelector("#confirm").value;
    var err = document.querySelector(".errNote");
    if(nowPass.length == 0 || newPass.length == 0 || confirmNewPass.length == 0) {
        err.innerHTML = "You need to fill in all the boxes";
        return;
    }
    fetch(usersAPI+'/'+localStorage.id)
    .then(function(response) {
        return response.json();
    })
    .then(function(user) {
        if (user.id == localStorage.id){
            if(user.password != nowPass) 
                 err.innerHTML = "Your old password is INCORRECT";
            else if (user.password == newPass)
                err.innerHTML = "New password cannot like old password";
            else if (newPass != confirmNewPass) 
                err.innerHTML = "Confirm password is INCORRECT";
            else {
                err.innerHTML = "Successfully change your password!";
                updatePassword(newPass);
            }
        }
    });
}
function updatePassword(newPass) {
    var data= {password: newPass}
    fetch(usersAPI+ '/' + localStorage.id,{
        method: 'PUT',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response=>{
        return response.json()
    })
    .then(data=> 
        alert("Successfully change your password!"))
}
