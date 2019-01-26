<?php

require_once('DB.php');
header("Content-Type: application/json; charset=UTF-8");


function get_request_method()
{
    return $_SERVER['REQUEST_METHOD'];
}


try{
    $query;
    
    if (get_request_method() == "POST")
    {
        $query = "INSERT INTO uzytkownicy (nazwa_uzytkownika, haslo) VALUES ('" . $_POST["nazwa_uzytkownika"] . "', '" . $_POST["haslo"] . "');";
    }


    $db = new DB();
    $db->execute_query($query);
    echo json_encode($db->$result);

}
catch(PDOException $e)
{
    echo $query . "<br>" . $e->getMessage();
}




?>