<?php

session_start();


if (!isset($_SESSION['newsession']) || !isset($_SESSION['username']))
{
    session_unset();
    header("Location: /projekt2/Auth.php");
    die();
}

?>


<!DOCTYPE html>

<html>
<head>
    <title>Serwis sportowy</title>
    <meta charset="utf-8"/>
    <script src="js/index.js" type="text/javascript">
        var sessUser = <?php echo $_SESSION['username'];?>
    </script>
    <link rel="stylesheet" type="text/css" href="css/index.css"/>    
</head>
<body>
    <div class="navbar">
        <a href="#" onclick='drawChart()'>Wykres</a>
        <a href="Logout.php">Wyloguj</a>
    </div>
    <div id="main" >
        <form id="form">
            <input type="date" name="date" value="2019-01-26" min="2019-01-01" max="2019-01-31"/>
            <input type="text" name="name" placeholder="Nazwa wydarzenia"/>
        </form>
        <div id="message"></div>
        <button id="sendToServerButton" onclick="sendDataToServer()">Wyślij na serwer</button>
        <button id="sendToLocalButton" onclick="sendDataToLocal()">Wyślij do lokalnej bazy</button>
        <br><br>

        <button onclick="fetchDataFromServer()">Pobierz dane z serwera</button>
        <button onclick="fetchDataFromLocal()">Pobierz dane z lokalnej bazy</button>
        <div id="result"></div>
        
    </div>
</body>
</html>