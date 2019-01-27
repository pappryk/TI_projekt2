function login()
{
    if (!validate())
        return false;

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
        return response.text();
    })
    .then(text => {
        document.getElementById('message').innerHTML = text;
    });
}




function register()
{
    if (!validate())
        return false;

    let form = document.getElementById("form");

    let data = new FormData();
    data.append("login", form.login.value);
    data.append("password", form.password.value);


    fetch('Register.php', {
        method: "POST",
        body: data
    })
    .then(response => {
        if (!response.ok)
        {
            document.getElementById('message').style.color = 'red';
        }
        else
        {
            document.getElementById('message').style.color = 'green';
        }

        return response.text();
    })
    .then(text => {
        document.getElementById('message').innerHTML = text;
    });
}




function validate()
{
    let form = document.getElementById("form");
    let message = "";
    let valid = true;

    if (form.login.value.length == 0)
    {
        valid = false;
        message += "Login jest wymagany.<br>";
    }
    if (form.password.value.length == 0)
    {
        valid = false;
        message += "Hasło jest wymagane."
    }

    document.getElementById('message').innerHTML = message;
    document.getElementById('message').style.color = 'red';

    if (!valid)
        return false;
    return true;
}