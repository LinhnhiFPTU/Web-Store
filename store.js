var usersAPI = "https://61b32a86af5ff70017ca1d02.mockapi.io/users";
var userList = [];
fetch(usersAPI)
    .then(function(response) {
        return response.json();
    })
    .then(function(user) {
         userList = userList.concat(user);
    });