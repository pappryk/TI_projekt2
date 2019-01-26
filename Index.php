<?php

if (session_status() != PHP_SESSION_ACTIVE)
{
    header("Location: /projekt2/Auth.php");
    die();
}

?>
