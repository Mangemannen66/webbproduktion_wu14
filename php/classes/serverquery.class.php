<?php

class ServerQuery extends PDOHelper {	

  protected $user_info = array("user_id" => 1);
  protected $menu_name = "menu-main-menu";
 

  public function saveArticle($page_data) {

    $page_data[":user_id"] = $this->user_info["user_id"];

    $sql = "INSERT INTO pages (title, content, user_id) VALUES (:title, :content, :user_id)";

    return $this->query($sql, $page_data);


  }

  public function saveUrl($url_data){

    $sql = "SELECT pid FROM pages ORDER BY created DESC LIMIT 1";

    $new_pid = $this->query($sql);

    $new_pid = $new_pid[0]["pid"];

    $url_path = $url_data[":path"];

    unset($url_data[":path"]);

    //insert new page url alias
    $sql2 = "INSERT INTO url_alias (path, pid) VALUES (:path, :pid)";

    $url_data = array(
      ":path" => $url_path,
      ":pid" => $new_pid
      );

    return $this->query($sql2, $url_data);

  }

  public function addMenuLink($menu_data){

    $sql = "INSERT INTO menu_links (title, path, menu, plid, weight) VALUES (:title, :path, :menu_name, :plid, :weight)";

    $menu_data = array(
      ":title" => $menu_data["title"],
      ":path" => $menu_data["path"],
      ":menu_name" => $menu_data["parent"]["menu"],
      ":plid" => $menu_data["parent"]["mlid"] ? $menu_data["parent"]["mlid"] : null,
      ":weight" => $menu_data["weight"],
      );

    return $this->query($sql, $menu_data);
  }

  public function getAllArticles(){

    $sql = "SELECT pages.pid, pages.title AS pageTitle, CONCAT(users.fname,' ', users.lname) AS author, pages.created
    FROM pages, users ORDER BY pages.pid DESC";

    return $this->query($sql);  

  }

/*
  public function getArticleFromAlias($href) {
      $single_article = array(":pid" => $href);
      $sql ="SELECT * FROM pages WHERE pid = :pid";
      $single_article_data = $this->query($sql, $single_article);

      return $single_article_data;
}
*/

  public function getArticleFromAlias($href) {
  
  $sql="SELECT pages.*, url_alias.path FROM pages, url_alias WHERE pages.pid = url_alias.pid AND url_alias.path = :href";
  $href=array(":href"=>$href);
  return $this->query($sql,$href);
  } 
  


/*
  public function getArticleFromAlias($alias) {
    $sql = "SELECT * FROM pages WHERE pid = :pid";
   // $page_data = array(":pid" => $url_result[0]["pid"]);
    $page_data = $this->query($sql, $page_data);

    return $this->query($sql, $page_data);
  }
  */

  public function getEditArticle($edit_article) {
      $this_article = array(":pid" => $edit_article);
      $sql ="SELECT * FROM pages WHERE pid = :pid";
      $this_article_data = $this->query($sql, $this_article);

      return $this_article_data;
  }


  public function saveEditArticle($update_data) {
      $sql = "UPDATE pages SET title = :title, content = :content WHERE pid = :pid ";
     return $this->query($sql, $update_data);
  }
  

  public function getMenuNames() {
    $sql = "SELECT * FROM menus";
    return $this->query($sql);
  }


  public function getMenuLinks($menu_name) {
    $menu_name = "menu-main-menu";
    $menu_name = array(
      ":menu_name" => $this->menu_name
      );
    $sql = "SELECT * FROM menu_links WHERE menu = :menu_name";
    
    return $this->query($sql, $menu_name);
  }


//Footer info
  public function getFooterContent() {
    $sql = "SELECT * FROM footer_info ";
    return $this->query($sql);
  }


}







