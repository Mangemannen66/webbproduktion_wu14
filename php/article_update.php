<?php

include_once("autoloader.php");

$query = New ServerQuery("127.0.0.1","webbproduktion_wu14","root","mysql");


if (isset($_REQUEST["update_data"])) {
  echo(json_encode($query->saveEditArticle($_REQUEST["update_data"])));
}

