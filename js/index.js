///////////////////////LOCAL OPERATIONS//////////////////

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
document.addEventListener('DOMContentLoaded', onLoad);


let onlineButton = "<br><button onclick='sendDataFromLocalToServer()'>Wyślij dane z lokalnej bazy na serwer</button>";

window.addEventListener('online', function(){
    lfr = document.getElementById('localFetchResult');
    if (lfr)
    {
        lfr.innerHTML += onlineButton;
        fetchDataFromLocal();
    }
});

window.addEventListener('offline', function(){
    lfr = document.getElementById('localFetchResult');
    if (lfr)
    {
        fetchDataFromLocal();
    }
});



let dbName = "SSDB";
let chartData = [];


if (!window.indexedDB) {
    window.alert("Przeglądarka nie wspiera lokalnej bazy danych.");
}

var request = indexedDB.open(dbName, 4);

request.onerror = function(event) {
    alert('Nie udało się połączyć z lokalną bazą');
    return false;
};

request.onsuccess = function(event) {
    db = event.target.result;
};

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    db.createObjectStore("zdarzenia", {autoIncrement: true});
}








function sendDataToLocal()
{
    let form = document.getElementById('form');
    if (!validate())
        return false;
    let z = {
        nazwa_zdarzenia: form.name.value,
        data_zdarzenia: form.date.value,
        nazwa_uzytkownika: getCookie('username')
    };
    
    var request = db.transaction(["zdarzenia"], "readwrite")
        .objectStore("zdarzenia")
        .add(z);

    request.onerror = function(event)
    {
        document.getElementById('message').innerHTML = "Nie udało się dodać rekordu do bazy danych!";
    }

    request.onsuccess = function(event)
    {
    }
}

let toRender = "<table><tr><th>Wydarzenie</th><th>Data</th><th>Użytkownik</th></tr>";


function fetchDataFromLocal()
{
    var objectStore = db.transaction(["zdarzenia"]).objectStore("zdarzenia");
    let result = document.getElementById('result');

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        
        if (cursor)
        {
            toRender += "<div id='localFetchResult'><tr><td>" + cursor.value.nazwa_zdarzenia + "</td><td>" + cursor.value.data_zdarzenia + "</td><td>" + cursor.value.nazwa_uzytkownika + "</td></tr>";
            cursor.continue();
        }
        else
        {
            toRender += "</table>"
            if (navigator.onLine)
                toRender += onlineButton;
            toRender += "</div>";
            result.innerHTML = toRender;
            toRender = "<table><tr><th>Wydarzenie</th><th>Data</th><th>Użytkownik</th></tr>";
        }

    }
}

///////////////////////////////////////////////////////////




function sendDataFromLocalToServer()
{
    var objectStore = db.transaction(["zdarzenia"], "readwrite").objectStore("zdarzenia");
    let result = document.getElementById('result');

    

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
                
        if (cursor)
        {
            let data = new FormData();
            data.append("name", cursor.value.nazwa_zdarzenia);
            data.append("date", cursor.value.data_zdarzenia);
            data.append("username", cursor.value.nazwa_uzytkownika)
        
            fetch('Server.php', {
                method: "POST",
                body: data
            })
            .then(response => {
                
                if (!response.ok)
                {
                    document.getElementById('message').innerHTML = "Nie udało się dodać rekordu do bazy danych!";
                }
            
                return response.text();
            })
            .then(body => {
            });
            cursor.continue();
        }
        else
        {
            toRender += "</table>"
            if (navigator.onLine)
                toRender += onlineButton;
            toRender += "</div>";
            result.innerHTML = toRender;
            toRender = "<table><tr><th>Wydarzenie</th><th>Data</th><th>Użytkownik</th></tr>";
            var del = objectStore.clear();
            del.onerror = () => document.getElementById('message').innerHTML = "Nie udało się przesłać danych z lokalnej bazy!";
        }

    }
}






///////////////// SERVER OPERATIONS //////////////////////

function fetchDataFromServer()
{


    let result = document.getElementById('result');

    fetch("Server.php")
        .then(response => response.json())
        .then(data => {
            let toRender = "<table><tr><th>Wydarzenie</th><th>Data</th><th>Użytkownik</th></tr>";
            chartData = [];
            for (let i = 0; i < data.length; ++i)
            {
                chartData.push(data[i]);
                toRender += "<tr><td>" + data[i].nazwa_zdarzenia + "</td><td>" + data[i].data_zdarzenia + "</td><td>" + data[i].nazwa_uzytkownika + "</td></tr>";
            }

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


/////////////// Chart ///////////////////



async function drawChart()
{
    let main = document.getElementById('main');
    let days = 31;
    let width = (window.innerWidth - 200) / (days);
    let maxHeight = 200;

    let data = await fetch("ChartData.php").then(response => response.json());

    let chData = new Array(days);

    let maxValue = 3;

    chData.fill(0, 0, days - 1);
    for (let i = 0; i < data.length; ++i)
    {
        let l = data[i].data_zdarzenia.length;
        let index = parseInt(data[i].data_zdarzenia.substring(l - 2));
        chData[index] = data[i].ilosc;
    }


    let toRender = "<svg width='" + window.innerWidth + "'px' height='500px'>";
    for (let i = 0; i < days; ++i)
    {
        let x = i * width + i;
        let r = Math.floor((Math.random() * 255))
        let g = Math.floor((Math.random() * 255))
        let b = Math.floor((Math.random() * 255))
        let height = chData[i]/maxValue * maxHeight + 2;
        let y = parseInt(maxHeight - height);
        let textY = maxHeight + 20;

        toRender += "<rect width='" + width + "px' x='" + x + "' height='" + height + "px' y='" + y + "' style='fill:rgb(" + r + ", " + g + ", " + b + ")' />"
        toRender += "<text x='" + x + "' y='" + textY + "'>" + (i+1) + "</text>"; 

    }
    toRender += "</svg>";
    main.innerHTML = toRender;
}



function drawService()
{
    let main = document.getElementById('main');
    main.innerHTML = `<form id="form">
    <input type="date" name="date" value="2019-01-26" min="2019-01-01" max="2019-01-31"/>
    <input type="text" name="name" placeholder="Nazwa wydarzenia"/>
</form>
<div id="message"></div>
<button id="sendToServerButton" onclick="sendDataToServer()">Wyślij na serwer</button>
<button id="sendToLocalButton" onclick="sendDataToLocal()">Wyślij do lokalnej bazy</button>
<br><br>

<button onclick="fetchDataFromServer()">Pobierz dane z serwera</button>
<button onclick="fetchDataFromLocal()">Pobierz dane z lokalnej bazy</button>
<div id="result"></div>`;
}





function onLoad()
{   

}




function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }