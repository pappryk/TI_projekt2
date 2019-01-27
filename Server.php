<?php

require_once('DB.php');
session_start();

if (!isset($_SESSION['newsession']) || !isset($_SESSION['username']))
{
    session_unset();
    die();
}


function get_request_method()
{
    return $_SERVER['REQUEST_METHOD'];
}


try{
    $query;
    
    if (get_request_method() == "GET")
    {
        header("Content-Type: application/json; charset=UTF-8");
        $query = "SELECT * FROM zdarzenia;";
        // $query = "SELECT data_zdarzenia , count(*) FROM zdarzenia GROUP BY data_zdarzenia;";
        $db = new DB();
        $db->read($query);
        echo json_encode($db->$result);
    }
    else if (get_request_method() == "POST")
    {
        if (!isset($_POST["name"]) || !isset($_POST["date"]) || empty($_POST["name"]) || empty($_POST["date"]))
        {
            header($_SERVER['SERVER_PROTOCOL'] . ' 406 Not Acceptable', true, 406);
            exit("Błąd formatu");
        }
        
        $user = isset($_POST['username']) ? $_POST['username'] : $_SESSION['username'];
        $query = "INSERT INTO zdarzenia (nazwa_zdarzenia, data_zdarzenia, nazwa_uzytkownika) VALUES ('" . $_POST["name"] . "', '" . $_POST["date"] . "', '" . $user . "');";
        $db = new DB();
        $db->insert($query);

    }



}
catch(PDOException $e)
{
    echo $query . "<br>" . $e->getMessage();
}

$conn = null;
?>