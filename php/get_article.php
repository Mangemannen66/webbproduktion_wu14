<?php

include_once("autoloader.php");

$query = New ServerQuery("127.0.0.1","webbproduktion_wu14","root","mysql");

if (isset($_REQUEST["href"])) {
  echo(json_encode($query->getArticleFromAlias($_REQUEST["href"])));
}