<?php

class Article extends PDOHelper {	



  public function saveNewArticle($page_data) {


    $sql = "INSERT INTO pages (title, body) VALUES (:title, :body)";
    //since we are using prepared SQL statements, 
    //SQL and data are sent separately to the query method

    //first insert into the pages table
    $this->query($sql, $page_data);



    return true;
  }
}
