<?php

class Articlequery extends PDOHelper {	

  protected $user_info = array("user_id" => 1);
  protected $menu_name = "menu-main-menu";
 

    public function saveArticle($page_data) {

    $page_data[":user_id"] = $this->user_info["user_id"];

   // $menu_data = (isset($page_data["menuData"]) ? $page_data["menuData"] : null);

    //$page_data["menuData"];

    //unset($page_data["menuData"]);

    $sql = "INSERT INTO pages (title, content, user_id) VALUES (:title, :content, :user_id)";

    return $this->query($sql, $page_data);

    $menu_data[":path"] = $this->saveUrl($url_path);

    echo "$saveUrl";

    $this->addMenuLink($menu_data);

  }

  public function saveUrl($url_data){

    $sql = "SELECT pid FROM pages ORDER BY created DESC LIMIT 1";

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


      $sql = "INSERT INTO menu_links (title, path, plid, menu, weight) VALUES (:title, :path, :plid, :menu, :weight)";

      $menu_name = "menu-main-menu";
      $menu_data[":menu"] = array(":menu_name" => $this->menu_name);

      $menuData = array(
        ":title" => $menu_data["title"],
        ":path" => $menu_data["path"],
        ":plid" => $menu_data["plid"],
        ":menu" => $menu_data["menu"],
        ":weight" => $menu_data["weight"],
      );

      return $this->query($sql, $menuData);
    }
   // return true;
  


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




