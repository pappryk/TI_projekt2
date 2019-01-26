function login()
{
    let form = document.getElementById("form");

    let data = new FormData();
    data.append("login", form.login.value);
    data.append("password", form.password.value);

}
