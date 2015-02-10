<?php

include_once("autoloader.php");

$query = New ArticleQuery("127.0.0.1","webbproduktion_wu14","root","mysql");

if (isset($_REQUEST["search_param"])) {
  //get content we are searching for by title
  echo(json_encode($cq->searchForPages($_REQUEST["search_param"])));
} elseif (isset($_REQUEST["url_alias"])) {
  echo(json_encode($cq->getPageFromUrl($_REQUEST["url_alias"])));
} else {
  //get all content
  echo(json_encode($cq->getAllPages()));
}