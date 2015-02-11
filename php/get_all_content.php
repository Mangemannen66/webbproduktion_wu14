<?php

include_once("autoloader.php");

$query = New ArticleQuery("127.0.0.1","webbproduktion_wu14","root","mysql");

//get all page content
if (isset($_REQUEST["get_all"])) {

  echo(json_encode($query->getAllArticles()));
}