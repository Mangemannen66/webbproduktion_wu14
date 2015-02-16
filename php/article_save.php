<?php

include_once("autoloader.php");

$query = New ServerQuery("127.0.0.1","webbproduktion_wu14","root","mysql");

//save content if told to do so (by receiving correct AJAX data)
if (isset($_REQUEST["page_data"])) {
  //save page and echo articlequery response
  echo(json_encode($query->saveArticle($_REQUEST["page_data"])));
}
if (isset($_REQUEST["page_url"])) {
  echo(json_encode($query->saveUrl($_REQUEST["page_url"])));
}
if (isset($_REQUEST["menu_data"])) {
  echo(json_encode($query->addMenuLink($_REQUEST["menu_data"])));
}