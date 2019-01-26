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
    <script src="auth.js" type="text/javascript"></script>
</head>
<body>
    <div class="topbar">
        <form id="form">
            <input type="text" name="login" placeholder="Login"/>
            <input type="password" name="password" placeholder="Hasło"/>
        </form>
        <button id="loginButton" onclick="login()">Zaloguj się</button>
        <button id="loginButton" onclick="register()">Zarejestruj się</button>
    </div>
    <div id="message"></div>
</body>
</html>