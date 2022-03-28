//Запуск функций - постоянно:
navBarAdmin();
showAllUsers();
showAdminInfo();
//Запуск по клику:
//createUser();
//editUser();
//deleteUser();
/*-----------------------------------------------------------------------------------------------------------*/
function navBarAdmin() {
    fetch('http://localhost:8080/info/principal', {
        method: "GET",
        headers: {"Accept": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(userBar => {
            //console.log(user);
            document.getElementById("nav_email").innerHTML = userBar.email;
            let stringOfRoles = document.createElement('ul');
            for (let i = 0; i < userBar.roles.length; i++) {
                let role = document.createElement('li');
                role.textContent = userBar.roles[i].roleNameWithoutSuf + " ";
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
        role.textContent = user.roles[i].roleNameWithoutSuf + " ";
        listOfRoles.appendChild(role);
    }
    return listOfRoles;
}

/*-----------------------------------------------------------------------------------------------------------*/
function showAllUsers() {
    let tableAllUsers = document.getElementById("tableAllUsers");
    tableAllUsers.innerHTML = ""; //очищаем таблицу перед выводом на экран

    fetch('http://localhost:8080/admin/all', {
        method: "GET",
        headers: {"Accept": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(users => {
            //console.log(users);
            users.forEach(function (user) {
                let row = tableAllUsers.insertRow();
                //https://metanit.com/web/javascript/20.5.php
                row.setAttribute("rowId", "row" + user.userId);
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
function showAdminInfo() {
    let tableAdminInfo = document.getElementById("tableAdminInfo");
    tableAdminInfo.innerHTML = "";

    fetch('http://localhost:8080/info/principal', {
        method: "GET",
        headers: {"Accept": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(user => {
            // console.log(user)
            let row = tableAdminInfo.insertRow();
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
    let roles_new = [];
    let roles_new_selected = document.getElementById("roles_new").options

    for (let i = 0; i < roles_new_selected.length; i++) {
        if (roles_new_selected[i].selected) {
            roles_new.push(JSON.parse('{"roleId":"' + roles_new_selected[i].id.substr(16) + '", "roleName":"' + roles_new_selected[i].value + '"}'));
        }
    }

    let user = {
        firstName: document.getElementById("firstname_new").value,
        lastName: document.getElementById("lastname_new").value,
        age: document.getElementById("age_new").value,
        email: document.getElementById("email_new").value,
        password: document.getElementById("password_new").value,
        roles: roles_new
    }

        fetch('http://localhost:8080/admin/add', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8", "Accept": "application/json; charset=UTF-8"},
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(users => {
                /*  users.forEach(function (user) {
                let row = tableAllUsers.insertRow();
                row.setAttribute("rowId", "row" + user.userId);
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
            })*/
            });
}

/*-----------------------------------------------------------------------------------------------------------*/
function editUser() {

    let userId = document.getElementById("id_ed").value;
    let rowEdit = document.querySelector(`[rowId="row${userId}"]`);

    let roles_edit = [];
    let roles_edit_selected = document.getElementById("roles_ed").options

    for (let i = 0; i < roles_edit_selected.length; i++) {
        if (roles_edit_selected[i].selected) {
            roles_edit.push(JSON.parse('{"roleId":"' + roles_edit_selected[i].id.substr(15) + '", "roleName":"' + roles_edit_selected[i].value + '"}'));
        }
    }

    let user = {
        userId: userId,
        firstName: document.getElementById("firstname_ed").value,
        lastName: document.getElementById("lastname_ed").value,
        age: document.getElementById("age_ed").value,
        email: document.getElementById("email_ed").value,
        password: document.getElementById("password_ed").value,
        roles: roles_edit
    }

    fetch('http://localhost:8080/admin/edit', {
        method: 'PUT',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(user),
    })
        .then(response => response.json())
        .then(user => {
            rowEdit.innerHTML = ""; //очищаем выбранную строку
            let n1 = rowEdit.insertCell();
            n1.innerHTML = new Number(user.userId).toFixed();
            let n2 = rowEdit.insertCell();
            n2.innerHTML = user.firstName;
            let n3 = rowEdit.insertCell();
            n3.innerHTML = user.lastName;
            let n4 = rowEdit.insertCell();
            n4.innerHTML = user.age;
            let n5 = rowEdit.insertCell();
            n5.innerHTML = user.email;
            let n6 = rowEdit.insertCell();
            n6.innerHTML = listOfRoles(user).textContent;
            let n7 = rowEdit.insertCell();
            n7.innerHTML = '<button type="button" onclick="modalEditUser(' + user.userId + ')" class="btn-sm btn-info">Edit</button>';
            let n8 = rowEdit.insertCell();
            n8.innerHTML = '<button type="button" onclick="modalDeleteUser(' + user.userId + ')" class="btn-sm btn-danger">Delete</button>';
        });
}

/*-----------------------------------------------------------------------------------------------------------*/
function deleteUser() {
    let userId = document.getElementById("id_del").value;
    fetch('http://localhost:8080/admin/delete/' + userId, {
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(user => {
            document.querySelector(`[rowId="row${userId}"]`).remove()
            //$('#' + userId).remove();
            //$('tr:last-child').remove();
            //$('#tableAllUsers tr[data-rowid=userId]').remove();
        });
    ;
}

/*-----------------------------------------------------------------------------------------------------------*/
function modalEditUser(id) {
    fetch('http://localhost:8080/info/' + id)
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
                    $('#admin_select_ed').attr('selected', 'selected')
                }
                if (user.roles[i].roleName == "ROLE_USER") {
                    $('#user_select_ed').attr('selected', 'selected')
                }
            }
            $('#modalEditUser').modal("show") //запускаем модал
            $('#modalEditUser').on('hidden.bs.modal', function () { //очищает выделенные роли при закрытии
                $('#role_select_ed_1').removeAttr('selected')
                $('#role_select_ed_2').removeAttr('selected')
            });
        });
}

/*-----------------------------------------------------------------------------------------------------------*/
function modalDeleteUser(id) {
    fetch('http://localhost:8080/info/' + id)
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
                    $('#role_select_del_1').attr('selected', 'selected')
                }
                if (user.roles[i].roleName == "ROLE_USER") {
                    $('#role_select_del_2').attr('selected', 'selected')
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

