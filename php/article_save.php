<?php

include_once("autoloader.php");

$query = New Articlequery("127.0.0.1","webbproduktion_wu14","root","mysql");

//save content if told to do so (by receiving correct AJAX data)
if (isset($_REQUEST["page_data"])) {
  //save page and echo ContentQueries response
  echo(json_encode($query->saveNewArticle($_REQUEST["page_data"])));
}