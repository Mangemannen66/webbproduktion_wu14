<?php

include_once("autoloader.php");

$query = New Articlequery("127.0.0.1","webbproduktion_wu14","root","mysql");

//get menu links for a specific menu_name if told to do so 
//(by receiving correct AJAX data), else get all menu_names
if (isset($_REQUEST["menu_name"])) {
  //get all menu_links for a specific menu_name
  echo(json_encode($query->getMenuLinks($_REQUEST["menu_name"])));
} else {
  //get all menu_names
  echo(json_encode($query->getMenuNames()));
}