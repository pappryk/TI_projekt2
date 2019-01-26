<?php

require_once('DB.php');


function get_request_method()
{
    return $_SERVER['REQUEST_METHOD'];
}


try{
    $query;
    
    if (get_request_method() != "POST"  || !isset($_POST["login"]) || !isset($_POST["password"]) || empty($_POST["login"]) || empty($_POST["password"]))
    {
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
        exit("Niepoprawne dane uzytkownika");
    }
    else
    {
        $db = new DB();
        $query = "SELECT * FROM uzytkownicy WHERE nazwa_uzytkownika = '" . $_POST["login"] . "';";
        $db->read($query);

        if (count($db->$result) > 0)
        {
            header($_SERVER['SERVER_PROTOCOL'] . ' 406 Not Acceptable', true, 406);
            exit("Nazwa uzytkownika zajeta");
        }

        $db = new DB();

        $query = "INSERT INTO uzytkownicy (nazwa_uzytkownika, haslo) VALUES ('" . $_POST["login"] . "', '" . $_POST["password"] . "');";

        $db->insert($query);

        header($_SERVER["SERVER_PROTOCOL"]." 200 OK", true, 200); 
        echo "Zarejestrowano";
    }


    

    
}
catch(PDOException $e)
{
    echo $query . "<br>" . $e->getMessage();
}




?>