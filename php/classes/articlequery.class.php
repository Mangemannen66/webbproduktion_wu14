<?php

class Articlequery extends PDOHelper {	

  protected $user_info = array("user_id" => 1);

  public function saveNewArticle($page_data) {

    $page_data[":user_id"] = $this->user_info["user_id"];

    $sql = "INSERT INTO pages (title, content, user_id) VALUES (:title, :content, :user_id)";

    $this->query($sql, $page_data);



    return true;
  }
}
