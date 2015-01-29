<?php

class Articlequery extends PDOHelper {	

  protected $user_info = array("user_id" => 1);

  public function saveNewArticle($page_data) {

    $page_data[":user_id"] = $this->user_info["user_id"];

    $sql = "INSERT INTO pages (title, content, user_id) VALUES (:title, :content, :user_id)";
    //since we are using prepared SQL statements, 
    //SQL and data are sent separately to the query method

    //first insert into the pages table
    $this->query($sql, $page_data);



    return true;
  }
}
