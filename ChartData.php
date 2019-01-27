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
        $query = "SELECT data_zdarzenia , count(*) as ilosc FROM zdarzenia GROUP BY data_zdarzenia;";
        $db = new DB();
        $db->read($query);
        echo json_encode($db->$result);
    }

}
catch(PDOException $e)
{
    echo $query . "<br>" . $e->getMessage();
}

$conn = null;
?>