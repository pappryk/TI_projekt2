function fetchDataFromServer()
{


    let result = document.getElementById('result');

    fetch("Server.php")
        .then(response => response.json())
        .then(data => {
            let toRender = "<table><tr><th>Wydarzenie</th><th>Data</th><th>Użytkownik</th></tr>";
            for (let i = 0; i < data.length; ++i)
            {
                toRender += "<tr><td>" + data[i].nazwa_zdarzenia + "</td><td>" + data[i].data_zdarzenia + "</td><td>" + data[i].nazwa_uzytkownika + "</td></tr>";

            }
            console.log(data);

            toRender += "</table>";

            result.innerHTML = toRender;
        });
    
}



function sendDataToServer()
{

    if (!validate())
        return false;

    let form = document.getElementById('form');
    let data = new FormData();
    data.append("name", form.name.value);
    data.append("date", form.date.value);

    fetch('Server.php', {
        method: "POST",
        body: data
    })
    .then(response => {
        
        if (response.ok)
        {
            fetchDataFromServer();
        }

        form.name.value = "";

        return response.text();
    })
    .then(body => {
        console.log(body);
    });
}





function validate()
{
    let form = document.getElementById("form");
    let message = "";
    let valid = true;

    if (form.name.value.length == 0)
    {
        valid = false;
        message += "Nazwa jest wymagana.<br>";
    }
    if (form.date.value.length == 0)
    {
        valid = false;
        message += "Data jest wymagana."
    }

    document.getElementById('message').innerHTML = message;
    document.getElementById('message').style.color = 'red';

    if (!valid)
        return false;

    document.getElementById('message').innerHTML = "";    
    return true;
}