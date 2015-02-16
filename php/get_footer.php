<?
include_once("autoloader.php");
$query = New ServerQuery("127.0.0.1","webbproduktion_wu14","root","mysql");
//get footerinfo 
  echo(json_encode($query->getFooterContent()));
