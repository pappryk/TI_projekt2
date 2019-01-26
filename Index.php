<?php

session_start();


if (!isset($_SESSION['newsession']) || !isset($_SESSION['username']))
{
    session_unset();
    header("Location: /projekt2/Auth.php");
    die();
}

?>
