<?php

require_once('DB.php');
header("Content-Type: application/json; charset=UTF-8");


function get_request_method()
{
    return $_SERVER['REQUEST_METHOD'];
}


try{
    $query;
    
    if (get_request_method() == "GET")
    {
        $query = "SELECT * FROM zdarzenia;";
    }
    else if (get_request_method() == "POST")
    {
        $query = "INSERT INTO zdarzenia (nazwa_zdarzenia, data_zdarzenia) VALUES ('" . $_POST["nazwa_zdarzenia"] . "', '" . $_POST["data_zdarzenia"] . "');";
    }


    $db = new DB();
    $db->execute_query($query);
    echo json_encode($db->$result);

}
catch(PDOException $e)
{
    echo $query . "<br>" . $e->getMessage();
}

$conn = null;
?>