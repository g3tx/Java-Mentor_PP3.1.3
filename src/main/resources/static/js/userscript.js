//Запуск функций - постоянно:
navBarUser();
showUserInfo();
/*-----------------------------------------------------------------------------------------------------------*/

function navBarUser() {
    fetch('http://localhost:8080/info/principal', {
        method: "GET",
        headers: {"Accept": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(userBar => {
            //console.log(user);
            document.getElementById("nav_email").innerHTML = userBar.email;
        });
}

/*-----------------------------------------------------------------------------------------------------------*/

function showUserInfo() {
    let tableUserInfo = document.getElementById("tableUserInfo");
    //tableUserInfo.innerHTML = "";

    fetch('http://localhost:8080/info/principal', {
        method: "GET",
        headers: {"Accept": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(user => {
            // console.log(user)
            let row = tableUserInfo.insertRow();
            let n1 = row.insertCell();
            n1.innerHTML = new Number(user.userId).toFixed();
            let n2 = row.insertCell();
            n2.innerHTML = user.firstName;
            let n3 = row.insertCell();
            n3.innerHTML = user.lastName;
            let n4 = row.insertCell();
            n4.innerHTML = user.age;
            let n5 = row.insertCell();
            n5.innerHTML = user.email;
            let n6 = row.insertCell();
            n6.innerHTML = "USER";
        });
}