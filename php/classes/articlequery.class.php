<?php

class Articlequery extends PDOHelper {	

  protected $user_info = array("user_id" => 1);
  protected $menu_name = "menu-main-menu";
 

    public function saveArticle($page_data) {

    $page_data[":user_id"] = $this->user_info["user_id"];

    $menu_data = (isset($page_data["menuData"]) ? $page_data["menuData"] : null);

    //$page_data["menuData"];

    unset($page_data["menuData"]);

    $sql = "INSERT INTO pages (title, content, user_id) VALUES (:title, :content, :user_id)";

    return $this->query($sql, $page_data);

    $menu_data[":path"] = $this->saveUrl($url_path);

    $this->addMenuLink($menu_data);

  }

  public function saveUrl($url_data){

    $sql = "SELECT pid FROM pages ORDER BY created DESC LIMIT 1";
      $new_pid = $this->query($sql);
    //extract pid from the array we get back
    $new_pid = $new_pid[0]["pid"];
  
    $new_pid = $this->query($sql);

    $new_pid = $new_pid[0]["pid"];

    $url_path = $url_data[":path"];

    unset($url_data[":path"]);



    //insert new page url alias
    $sql2 = "INSERT INTO url_alias (path, pid) VALUES (:path, :pid)";
    $url_data = array(":path" => $url_path, ":pid" => $new_pid);
    return $this->query($sql2, $url_data);


  }

  public function addMenuLink($menu_data){


      if (isset($menuData)) {
      $sql4 = "INSERT INTO menu_links (title, path, menu, plid, weight) VALUES (:title, :path, :menu_name, :plid, :weight)";
      $menu_data = array(
        ":title" => $menu_data["title"],
        ":path" => $url_path,
        ":menu_name" => $menu_data["parent"]["menu"],
        ":plid" => $menu_data["parent"]["mlid"] ? $menu_data["parent"]["mlid"] : null,
        ":weight" => $menu_data["weight"],
      );
      $this->query($sql4, $menu_data);
    }

    return true;

  }


  /**
   * Menus
   */

  public function getMenuNames() {
    $sql = "SELECT * FROM menus";
    return $this->query($sql);
  }


  public function getMenuLinks($menu_name) {
    $menu_name = "menu-main-menu";
    $menu_name = array(":menu_name" => $this->menu_name);
    $sql = "SELECT * FROM menu_links WHERE menu = :menu_name";
    
    return $this->query($sql, $menu_name);
  }
}




