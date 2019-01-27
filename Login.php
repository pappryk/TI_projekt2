<?php

require_once('DB.php');


function get_request_method()
{
    return $_SERVER["REQUEST_METHOD"];
}


try{
    
    if (get_request_method() != "POST"  || !isset($_POST["login"]) || !isset($_POST["password"]) || empty($_POST["login"]) || empty($_POST["password"]))
    {
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
        exit("Niepoprawny login lub hasło.");
    }
    else
    {
        $query = "SELECT * FROM uzytkownicy";

        $db = new DB();
        $db->read($query);
    
        $authenticated = false;
    
        foreach($db->$result as $val)
        {
            if ($val["nazwa_uzytkownika"] == $_POST["login"])
            {
                if ($val["haslo"] == $_POST["password"])
                {
                    $authenticated = true;
                }
            }
        }




    
        if ($authenticated)
        {
            session_start();
            session_unset();
            $_SESSION['newsession'] = 123123;
            $_SESSION['username'] = $_POST["login"];
            setcookie('username', $_POST["login"]);
            header($_SERVER["SERVER_PROTOCOL"]." 200 OK", true, 200); 
        }
        else
        {
            header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
            exit("Niepoprawny login lub hasło!");
        }
    }
    exit;
}
catch(PDOException $e)
{
    echo $query . "<br>" . $e->getMessage();
}




?>