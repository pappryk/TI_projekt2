<?php

require_once('DB.php');


function get_request_method()
{
    return $_SERVER["REQUEST_METHOD"];
}


try{
    
    if (get_request_method() == "POST")
    {
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    }
    else
    {
        $query = "SELECT * FROM uzytkownicy";

        $db = new DB();
        $db->execute_query($query);
    
        $authenticated = false;
    
        foreach($db->result as $val)
        {
            if ($val["nazwa_uzytkownika"] == $_POST["nazwa_uzytkownika"])
            {
                if ($val["haslo"] == $_POST["haslo"])
                {
                    $authenticated = true;
                }
            }
        }
    
        if ($authenticated)
        {
            header($_SERVER["SERVER_PROTOCOL"]." 200 OK", true, 200); 
        }
        else
        {
            header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404); 
        }
    }
}
catch(PDOException $e)
{
    echo $query . "<br>" . $e->getMessage();
}




?>