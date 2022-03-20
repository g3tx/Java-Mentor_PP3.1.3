//Запуск функций - постоянно:
navBar();
showAllUsers();
showUserInfo();
//Запуск по клику:
//createUser();
//editUser();
//deleteUser();
/*-----------------------------------------------------------------------------------------------------------*/
function navBar() {
    fetch('http://localhost:8080/admin/userinfo')
        .then(response => response.json())
        .then(user => {
            //console.log(user);
            document.getElementById("nav_email").innerHTML = user.email;
            let stringOfRoles = document.createElement('ul');
            for (let i = 0; i < user.roles.length; i++) {
                let role = document.createElement('li');
                role.textContent = user.roles[i].roleName + " ";
                stringOfRoles.appendChild(role);
            }
            // console.log(stringOfRoles);
            document.getElementById("nav_roles").innerHTML = 'with roles: ' + stringOfRoles.textContent;
        });
}

/*-----------------------------------------------------------------------------------------------------------*/
function listOfRoles(user) {
    let listOfRoles = document.createElement('ul');
    for (let i = 0; i < user.roles.length; i++) {
        let role = document.createElement('li');
        role.textContent = user.roles[i].roleName + " ";
        listOfRoles.appendChild(role);
    }
    return listOfRoles;
}

/*-----------------------------------------------------------------------------------------------------------*/
function showAllUsers() {
    let tableAllUsers = document.getElementById("tableAllUsers");
    tableAllUsers.innerHTML = ""; //очищаем таблицу перед выводом на экран
    fetch('http://localhost:8080/admin/all')
        .then(response => response.json())
        .then(users => {
            //console.log(users);
            users.forEach(function (user) {
                let row = tableAllUsers.insertRow();
                row.setAttribute("rowId", user.userId);
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
                n6.innerHTML = listOfRoles(user).textContent;
                let n7 = row.insertCell();
                n7.innerHTML = '<button type="button" onclick="modalEditUser(' + user.userId + ')" class="btn-sm btn-info">Edit</button>';
                let n8 = row.insertCell();
                n8.innerHTML = '<button type="button" onclick="modalDeleteUser(' + user.userId + ')" class="btn-sm btn-danger">Delete</button>';
                //http://www.w3bai.com/ru/jsref/met_tablerow_insertcell.html
            })
        });
}

/*-----------------------------------------------------------------------------------------------------------*/
function showUserInfo() {
    let tableUserInfo = document.getElementById("tableUserInfo");
    tableUserInfo.innerHTML = "";
    fetch('http://localhost:8080/admin/userinfo')
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
            n6.innerHTML = listOfRoles(user).textContent;
        });
}

/*-----------------------------------------------------------------------------------------------------------*/
function createUser() {
    let tableAllUsers = document.getElementById("tableAllUsers");
    let roles_new = "";
    let roles_new_selected = document.getElementById("roles_new")

    let roles = document.createElement('ul');
    for (let i = 0; i < roles_new_selected.length; i++) {
        let option = roles_new_selected.options[i];
        let role = document.createElement('li');
        if (option.selected) {
            roles_new = roles_new.concat(option.value + (i != (roles_new_selected.length - 1) ? "," : ""))
            role.textContent = option.value + " ";
            roles.appendChild(role);
        }
    }
    console.log(roles_new);
    fetch('http://localhost:8080/admin/add', {
        method: 'POST',
        body: JSON.stringify({
            firstName: document.getElementById("firstname_new").value,
            lastName: document.getElementById("lastname_new").value,
            age: document.getElementById("age_new").value,
            email: document.getElementById("email_new").value,
            password: document.getElementById("password_new").value,
            roles: roles_new
        }),
        headers: {"Content-type": "application/json", "Accept": "application/json"}
    })
        .then(response => response.json())
        .then(user => {
            console.log(user)
            let row = tableAllUsers.insertRow(-1);
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
            n6.innerHTML = listOfRoles(user).textContent;
            let n7 = row.insertCell();
            n7.innerHTML = '<button type="button" onclick="modalEditUser(' + user.userId + ')" class="btn-sm btn-info">Edit</button>';
            let n8 = row.insertCell();
            n8.innerHTML = '<button type="button" onclick="modalDeleteUser(' + user.userId + ')" class="btn-sm btn-danger">Delete</button>';
            //https://ask-dev.ru/info/458/add-table-row-in-jquery
        })
        .catch((error) => console.error(error));
}

/*-----------------------------------------------------------------------------------------------------------*/
function editUser() {
    let listOfRoles_ed = "";
    let roleSelect = document.getElementById("roles_edit");
    let userId = document.getElementById("id_ed").value;

    let listOfRoles = document.createElement('ul');
    for (let i = 0; i < roleSelect.length; i++) {
        let option = roleSelect.options[i];
        let role = document.createElement('li');
        if (option.selected) {
            listOfRoles_ed = listOfRoles_ed.concat(option.value + (i != (roleSelect.length - 1) ? "," : ""))
            role.textContent = option.value + " ";
            listOfRoles.appendChild(role);
        }
    }

    fetch('http://localhost:8080/admin/edit', {
        method: 'PUT',
        body: JSON.stringify({
            userId: document.getElementById("id_ed").value,
            firstName: document.getElementById("firstname_ed").value,
            lastName: document.getElementById("lastname_ed").value,
            age: document.getElementById("age_ed").value,
            email: document.getElementById("email_ed").value,
            password: document.getElementById("password_ed").value,
            roles: listOfRoles_ed
        }),
        headers: {"Content-type": "application/json", "Accept": "application/json"}
    })
        .then(response => {
            $('#' + userId).replaceWith('<tr id=' + userId + '>' +
                '<td>' + userId + '</td>' +
                '<td>' + document.getElementById("firstname_ed").value + '</td>' +
                '<td>' + document.getElementById("lastname_ed").value + '</td>' +
                '<td>' + document.getElementById("age_ed").value + '</td>' +
                '<td>' + document.getElementById("email_ed").value + '</td>' +
                '<td>' + listOfRoles.textContent + '</td>' +
                '<td> <button type="button" onclick="modalEditUser(' + userId + ')" class="btn-sm btn-info">Edit</button> </td>' +
                '<td> <button type="button" onclick="modalDeleteUser(' + userId + ')" class="btn-sm btn-danger">Delete</button> </td>' +
                '</tr>');
        });
}

/*-----------------------------------------------------------------------------------------------------------*/
function deleteUser(id) {
    fetch('http://localhost:8080/admin/delete/' + id, {
        method: 'DELETE',
        headers: {"Content-type": "application/json", "Accept": "application/json"}
    })
        .then(() => {
            console.log('removed');
    });
}

/*-----------------------------------------------------------------------------------------------------------*/
function modalEditUser(id) {
    fetch('http://localhost:8080/admin/info/' + id)
        .then(response => response.json())
        .then(user => {
            // console.log(user)
            $('#id_ed').val(user.userId)
            $('#firstname_ed').val(user.firstName)
            $('#lastname_ed').val(user.lastName)
            $('#age_ed').val(user.age)
            $('#email_ed').val(user.email)
            $('#password_ed').val(user.password)
            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].roleName == "ROLE_ADMIN") {
                    $('#admin_select_ed').atr('selected', 'selected')
                }
                if (user.roles[i].roleName == "ROLE_USER") {
                    $('#user_select_ed').attr('selected', 'selected')
                }
            }
            $('#modalEditUser').modal() //запускаем модал

            $('#modalEditUser').on('hidden.bs.modal', function () { //очищает выделенные роли при закрытии
                $('#admin_select_ed').removeAttr('selected')
                $('#user_select_ed').removeAttr('selected')
            });
        });
}

/*-----------------------------------------------------------------------------------------------------------*/
function modalDeleteUser(id) {
    fetch('http://localhost:8080/admin/info/' + id)
        .then(response => response.json())
        .then(user => {
            // console.log(user)
            $('#id_del').val(user.userId)
            $('#firstname_del').val(user.firstName)
            $('#lastname_del').val(user.lastName)
            $('#age_del').val(user.age)
            $('#email_del').val(user.email)
            $('#password_del').val(user.password)
            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].roleName == "ROLE_ADMIN") {
                    $('#admin_select_del').attr('selected', 'selected')
                }
                if (user.roles[i].roleName == "ROLE_USER") {
                    $('#user_select_del').attr('selected', 'selected')
                }
            }

            $('#modalDeleteUser').modal()

            $('#modalDeleteUser').on('hidden.bs.modal', function () {
                $('#admin_select_del').removeAttr('selected')
                $('#user_select_del').removeAttr('selected')
            });
        });
}

/*-----------------------------------------------------------------------------------------------------------*/

