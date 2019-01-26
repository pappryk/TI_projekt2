function login()
{
    let form = document.getElementById("form");

    let data = new FormData();
    data.append("login", form.login.value);
    data.append("password", form.password.value);


    fetch('Login.php', {
        method: "POST",
        body: data
    })
    .then(response => {
        if (response.ok)
        {
            window.location.href = "/projekt2/Index.php";
        }
    });
}




function register()
{
    let form = document.getElementById("form");

    let data = new FormData();
    data.append("login", form.login.value);
    data.append("password", form.password.value);


    fetch('Register.php', {
        method: "POST",
        body: data
    })
    .then(body => body.text())
    .then(text => {
        document.getElementById('message').innerHTML = text;
    });
}