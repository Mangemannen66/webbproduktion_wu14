<?php

include_once("autoloader.php");

$query = New ServerQuery("127.0.0.1","webbproduktion_wu14","root","mysql");

if (isset($_REQUEST["edit_article"])) {
  echo(json_encode($query->getEditArticle($_REQUEST["edit_article"])));
}