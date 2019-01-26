<?php

class DB 
{
    private $conn;
    private $sth;
    public $result;


    function __construct()
    {
        $this->$conn = new PDO("sqlite:sql/baza.db");
        $this->$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }


    function prep($query)
    {
        $this->$sth = $this->$conn->prepare($query);
        $this->$sth->execute();
    }


    function read($query)
    {
        $this->prep($query);
        $this->$result = $this->$sth->fetchAll(PDO::FETCH_ASSOC);
    }

    function insert($query)
    {
        $this->prep($query);
    }
}


?>