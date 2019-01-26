<?php

if (session_status() == PHP_SESSION_ACTIVE)
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
</body>
</html>