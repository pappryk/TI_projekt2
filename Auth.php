<?php

session_start();

if (isset($_SESSION['newsession']) && isset($_SESSION['username']))
{
    header("Location: /projekt2/Index.php");
    die();
}

?>


<!DOCTYPE html>

<html>
<head>
    <title>Serwis sportowy</title>
    <meta charset="utf-8"/>
    <script src="js/auth.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="css/auth.css"/>    
</head>
<body>
    <div class="box">
        <div class="signForm">
            <form id="form">
                <input type="text" name="login" placeholder="Login"/>
                <input type="password" name="password" placeholder="Hasło"/>
            </form>
            <button id="loginButton" onclick="login()">Zaloguj się</button>
            <button id="registerButton" onclick="register()">Zarejestruj się</button>
            <div id="message"></div>
        </div>
    </div>
    
</body>
</html>